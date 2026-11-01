const express = require("express");
const crypto = require("crypto");
const { AI_CHAT_SYSTEM_PROMPT } = require("../config/ai-chat.prompt");

const router = express.Router();

const MODEL = (process.env.GROQ_MODEL || "openai/gpt-oss-20b").trim();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const requestBuckets = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const current = requestBuckets.get(ip);

  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestBuckets.set(ip, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
};

const getMessageText = (message) => {
  if (typeof message?.content === "string") return message.content;

  if (!Array.isArray(message?.parts)) return "";

  return message.parts
    .filter((part) => part?.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n");
};

const writeUIChunk = (res, chunk) => {
  res.write(`data: ${JSON.stringify(chunk)}\n\n`);
};

router.post("/", async (req, res) => {
  if (isRateLimited(req.ip || req.socket.remoteAddress || "unknown")) {
    return res.status(429).json({
      success: false,
      error: "تعداد درخواست‌ها بیش از حد مجاز است. چند دقیقه دیگر دوباره تلاش کنید.",
    });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      success: false,
      error: "حداقل یک پیام برای شروع گفتگو ارسال کنید.",
    });
  }

  const conversationMessages = messages
    .filter((message) => ["user", "assistant"].includes(message?.role))
    .slice(-16)
    .map((message) => ({
      role: message.role,
      content: getMessageText(message).trim().slice(0, 5000),
    }))
    .filter((message) => message.content);

  if (
    !conversationMessages.length ||
    conversationMessages[conversationMessages.length - 1].role !== "user"
  ) {
    return res.status(400).json({
      success: false,
      error: "پیام ارسالی معتبر نیست.",
    });
  }

  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey.includes("\\")) {
    console.error("AI chat is not configured: GROQ_API_KEY is missing or malformed.");
    return res.status(503).json({
      success: false,
      error: "کلید Groq تنظیم نشده یا قالب آن نامعتبر است.",
      code: "GROQ_API_KEY_INVALID",
    });
  }

  let upstream;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        max_completion_tokens: 1200,
        messages: [
          { role: "system", content: AI_CHAT_SYSTEM_PROMPT },
          ...conversationMessages,
        ],
      }),
    });
  } catch (error) {
    const causeCode = error.cause?.code || error.code || error.name || "UNKNOWN";
    console.error("Groq connection error:", causeCode, error.message);
    return res.status(502).json({
      success: false,
      error: "ارتباط با Groq برقرار نشد. اتصال اینترنت سرور و دسترسی به api.groq.com را بررسی کنید.",
      code: "GROQ_CONNECTION_FAILED",
      causeCode,
    });
  }

  if (!upstream.ok || !upstream.body) {
    const errorBody = await upstream.text().catch(() => "");
    let providerError = {};

    try {
      providerError = JSON.parse(errorBody);
    } catch {
      // Keep the provider response out of the public API response.
    }

    const providerCode =
      providerError.error?.code || providerError.error?.type || "UPSTREAM_ERROR";

    console.error("Groq API rejected the request:", {
      status: upstream.status,
      code: providerCode,
      message: providerError.error?.message || errorBody.slice(0, 300),
      model: MODEL,
    });

    return res.status(502).json({
      success: false,
      error: "Groq درخواست را نپذیرفت. لاگ بک‌اند علت دقیق را نشان می‌دهد.",
      code: "GROQ_UPSTREAM_ERROR",
      providerStatus: upstream.status,
      providerCode,
    });
  }

  const messageId = crypto.randomUUID();
  const textId = crypto.randomUUID();

  res.status(200);
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("x-vercel-ai-ui-message-stream", "v1");
  res.flushHeaders?.();

  writeUIChunk(res, { type: "start", messageId });
  writeUIChunk(res, { type: "text-start", id: textId });

  let buffer = "";
  let finishReason = "stop";

  const processSSELine = (line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return;

    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") return;

    try {
      const data = JSON.parse(payload);
      const choice = data.choices?.[0];
      const content = choice?.delta?.content;

      if (typeof content === "string" && content.length) {
        writeUIChunk(res, {
          type: "text-delta",
          id: textId,
          delta: content,
        });
      }

      if (choice?.finish_reason) {
        finishReason = choice.finish_reason;
      }
    } catch {
      // Ignore malformed or non-JSON provider events.
    }
  };

  try {
    for await (const chunk of upstream.body) {
      if (res.destroyed) break;

      buffer += new TextDecoder().decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        processSSELine(line);
      }
    }

    if (buffer) processSSELine(buffer);

    if (!res.destroyed) {
      writeUIChunk(res, { type: "text-end", id: textId });
      writeUIChunk(res, { type: "finish-step" });
      writeUIChunk(res, {
        type: "finish",
        finishReason,
      });
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error) {
    console.error("AI stream error:", error.message);

    if (!res.destroyed) {
      writeUIChunk(res, {
        type: "error",
        errorText: "هنگام دریافت پاسخ هوش مصنوعی خطایی رخ داد.",
      });
      res.end();
    }
  }
});

module.exports = router;
