const COLORS = [
  "bg-violet-600",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

// حرف اول اسم رو برای آواتار می‌گیره
export const getInitial = (name = "") => name.trim().charAt(0).toUpperCase() || "?";

// یک رنگ ثابت (نه رندوم) بر اساس _id تولید می‌کنه — هر مکالمه همیشه همون رنگ رو داره
export const getColor = (id = "") => {
  const index = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % COLORS.length;
  return COLORS[index];
};

// زمان رو هوشمند فرمت می‌کنه: امروز = ساعت، غیر امروز = تاریخ کوتاه
export const formatTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();

  return isToday
    ? d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// یک Document واقعی Conversation رو به شکلی که ChatListItem انتظار داره تبدیل می‌کنه
export const toSidebarChat = (conversation) => {
  const lastMsg = conversation.messages[conversation.messages.length - 1];

  return {
    id: conversation._id,
    name: conversation.fullName,
    initial: getInitial(conversation.fullName),
    color: getColor(conversation._id),
    lastMessage: lastMsg ? lastMsg.text : "No messages yet",
    time: formatTime(conversation.lastMessageAt),
    unread: 0,
    pinned: false,
    muted: false,
  };
};