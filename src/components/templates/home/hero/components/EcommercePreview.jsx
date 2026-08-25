import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Easingهای بهینه‌شده برای حس نرمی و کنترل (Premium Motion)
const EASE = [0.4, 0, 0.2, 1];
const SHARED_EASE = [0.16, 1, 0.3, 1];

const STAGES = [
  { key: "dashboard", duration: 3000 },
  { key: "create", duration: 3000 },
  { key: "created", duration: 2000 },
  { key: "store", duration: 4000 },
  { key: "detail", duration: 3000 },
  { key: "store2", duration: 2000 },
];

const GLYPHS = ["tee", "hoodie", "sneaker"];

const BASE_PRODUCTS = [
  { id: "base-1", glyph: "tee" },
  { id: "base-2", glyph: "sneaker" },
  { id: "base-3", glyph: "hoodie" },
];

let uid = 0;

/* ---------- Premium Product Visuals ---------- */
function ProductVisual({ variant, className = "" }) {
  // شبیه‌سازی یک Mockup سه‌بعدی نرم با استفاده از لایه‌های SVG
  const isTee = variant === "tee";
  const isHoodie = variant === "hoodie";
  const isSneaker = variant === "sneaker";

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <filter id="subtle-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#subtle-shadow)">
        {isTee && (
          <path
            d="M25 20 C30 15, 70 15, 75 20 L90 35 L78 45 L70 38 L70 85 C70 88, 30 88, 30 85 L30 38 L22 45 L10 35 Z"
            fill={`url(#grad-${variant})`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
        {isHoodie && (
          <>
            <path
              d="M30 18 C40 5, 60 5, 70 18 C80 20, 85 25, 90 35 L80 45 L73 38 L75 85 C75 88, 25 88, 25 85 L27 38 L20 45 L10 35 C15 25, 20 20, 30 18 Z"
              fill={`url(#grad-${variant})`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M35 60 C35 60, 50 50, 65 60 L65 75 L35 75 Z" fill="currentColor" fillOpacity="0.2" />
          </>
        )}
        {isSneaker && (
          <path
            d="M15 70 C15 70, 15 50, 35 45 C40 40, 50 30, 65 35 C80 40, 85 55, 85 70 C85 80, 15 85, 15 70 Z"
            fill={`url(#grad-${variant})`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </g>
      
      {/* Inner highlights برای ایجاد حس بُعد (Depth) */}
      {isTee && <path d="M35 22 C45 28, 55 28, 65 22" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />}
      {isHoodie && <path d="M40 12 C50 18, 60 12, 60 12" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />}
      {isSneaker && <path d="M35 45 C45 55, 65 55, 75 45" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

/* ---------- Common UI Micro-Components ---------- */
function WindowControls() {
  return (
    <div className="flex shrink-0 gap-1.5 items-center">
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-800/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-800/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-neutral-800/80" />
    </div>
  );
}

function TopBar({ variant = "dashboard" }) {
  return (
    <div className="flex h-10 w-full shrink-0 items-center justify-between border-b border-neutral-800/50 px-4">
      {variant === "dashboard" || variant === "create" ? (
        <>
          <WindowControls />
          <div className="h-4 w-32 rounded-md bg-neutral-900 shadow-inner" />
          <span className="h-5 w-5 rounded-full bg-neutral-800" />
        </>
      ) : (
        <>
          <span className="h-4 w-4 rounded-sm bg-neutral-400" />
          <div className="flex gap-4">
            <span className="h-1.5 w-8 rounded-full bg-neutral-700" />
            <span className="h-1.5 w-8 rounded-full bg-neutral-800" />
            <span className="h-1.5 w-8 rounded-full bg-neutral-800" />
          </div>
          <div className="flex items-center gap-3">
            <svg className="h-3.5 w-3.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg className="h-3.5 w-3.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </>
      )}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-4 border-r border-neutral-800/50 pt-4">
      <div className="flex flex-col gap-1 items-center">
        <span className="h-4 w-4 rounded-[4px] bg-neutral-700" />
        <span className="h-1 w-6 rounded-full bg-neutral-600" />
      </div>
      <div className="flex flex-col gap-1 items-center opacity-40">
        <span className="h-4 w-4 rounded-[4px] border border-neutral-600" />
        <span className="h-1 w-6 rounded-full bg-neutral-700" />
      </div>
      <div className="flex flex-col gap-1 items-center opacity-40">
        <span className="h-4 w-4 rounded-full border border-neutral-600" />
        <span className="h-1 w-6 rounded-full bg-neutral-700" />
      </div>
    </div>
  );
}

function AdminChart() {
  return (
    <div className="relative mt-auto h-16 w-full overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/30">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#404040" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#404040" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,80 C20,70 30,90 50,60 C70,30 80,50 100,20 L100,100 L0,100 Z"
          fill="url(#chart-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M0,80 C20,70 30,90 50,60 C70,30 80,50 100,20"
          fill="none"
          stroke="#737373"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

/* ---------- Stages ---------- */

function DashboardPreview({ products }) {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-950">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <span className="h-2 w-20 rounded-full bg-neutral-600" />
              <span className="h-1.5 w-12 rounded-full bg-neutral-800" />
            </div>
            <span className="h-5 w-16 rounded-md bg-neutral-100" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {products.map((p) => (
              <motion.div
                key={p.id}
                layoutId={p.id.startsWith("p-") ? "shared-new-product" : undefined}
                className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900/50 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-transparent to-transparent opacity-50" />
                <ProductVisual variant={p.glyph} className="z-10 h-3/5 w-3/5 text-neutral-600" />
              </motion.div>
            ))}
          </div>
          <AdminChart />
        </div>
      </div>
    </div>
  );
}

function CreateProductPreview({ glyph }) {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-900/80">
      <TopBar variant="create" />
      <div className="flex h-full w-full items-center gap-6 p-6">
        <motion.div
          layoutId="shared-new-product"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: SHARED_EASE }}
          className="relative flex h-full w-1/2 shrink-0 items-center justify-center rounded-2xl border border-neutral-700/80 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl shadow-black/40"
        >
          <ProductVisual variant={glyph} className="h-3/5 w-3/5 text-neutral-400" />
          <div className="absolute right-3 top-3 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
          </div>
        </motion.div>
        
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-neutral-700" />
            <span className="h-7 w-full rounded-md border border-neutral-800 bg-neutral-900/40" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5 w-12 rounded-full bg-neutral-700" />
            <span className="h-7 w-3/4 rounded-md border border-neutral-800 bg-neutral-900/40" />
          </div>
          <div className="flex gap-2">
            <span className="h-5 w-12 rounded-full bg-neutral-800" />
            <span className="h-5 w-12 rounded-full bg-neutral-800" />
            <span className="h-5 w-12 rounded-full border border-neutral-700" />
          </div>
          <div className="flex-1" />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="h-8 w-full rounded-md bg-neutral-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>
      </div>
    </div>
  );
}

function ProductCreatedPreview({ products, newId }) {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-900/80">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <span className="h-2 w-20 rounded-full bg-neutral-600" />
              <span className="h-1.5 w-12 rounded-full bg-neutral-800" />
            </div>
            <span className="h-5 w-16 rounded-md bg-neutral-100" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {products.map((p) => {
              const isNew = p.id === newId;
              return (
                <motion.div
                  key={p.id}
                  layoutId={isNew ? "shared-new-product" : undefined}
                  animate={
                    isNew
                      ? { scale: [0.96, 1.02, 1], borderColor: ["#262626", "#737373", "#262626"] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.8, ease: SHARED_EASE }}
                  className={`relative aspect-square overflow-hidden rounded-xl border ${
                    isNew ? "border-neutral-600 bg-neutral-800/80" : "border-neutral-800/80 bg-neutral-900/50"
                  } flex items-center justify-center`}
                >
                  <ProductVisual variant={p.glyph} className={`z-10 h-3/5 w-3/5 ${isNew ? "text-neutral-400" : "text-neutral-600"}`} />
                </motion.div>
              );
            })}
          </div>
          <AdminChart />
        </div>
      </div>
    </div>
  );
}

function StorePreview({ products, newId, isSelecting }) {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-900/80">
      <TopBar variant="store" />
      <div className="flex flex-col gap-4 p-4 h-full">
        {/* Tiny Hero */}
        <div className="h-12 w-full rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 flex items-center px-4 justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="h-2 w-16 rounded-full bg-neutral-600" />
            <span className="h-1 w-10 rounded-full bg-neutral-700" />
          </div>
          <span className="h-6 w-16 rounded-lg bg-neutral-700/50" />
        </div>
        
        {/* Product Grid */}
        <div className="grid flex-1 grid-cols-2 gap-3">
          {products.map((p) => {
            const isNew = p.id === newId;
            return (
              <motion.div
                key={p.id}
                animate={isNew && isSelecting ? { scale: 1.02, opacity: 0.9 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col rounded-xl border border-neutral-800/60 overflow-hidden bg-neutral-900/30"
              >
                <motion.div
                  layoutId={isNew ? "shared-new-product" : undefined}
                  className={`flex flex-1 items-center justify-center ${
                    isNew && isSelecting ? "bg-neutral-800" : "bg-gradient-to-b from-neutral-800/80 to-neutral-900/80"
                  }`}
                >
                  <ProductVisual variant={p.glyph} className={`h-1/2 w-1/2 ${isNew ? "text-neutral-400" : "text-neutral-600"}`} />
                </motion.div>
                <div className="flex items-center justify-between p-2.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="h-1.5 w-12 rounded-full bg-neutral-600" />
                    <span className="h-1 w-8 rounded-full bg-neutral-700" />
                  </div>
                  <span className="h-4 w-4 rounded-full border border-neutral-600 flex items-center justify-center">
                     <span className="h-2 w-0.5 bg-neutral-500 rounded-full absolute" />
                     <span className="h-0.5 w-2 bg-neutral-500 rounded-full absolute" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductDetailPreview({ product }) {
  return (
    <div className="flex h-full w-full flex-col bg-neutral-900/80">
      <TopBar variant="store" />
      <div className="flex h-full items-stretch gap-5 p-5">
        <motion.div
          layoutId="shared-new-product"
          transition={{ duration: 0.6, ease: SHARED_EASE }}
          className="relative flex w-1/2 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/50 shadow-xl items-center justify-center"
        >
          <ProductVisual variant={product?.glyph ?? "tee"} className="h-1/2 w-1/2 text-neutral-400" />
        </motion.div>
        
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="h-3 w-4/5 rounded-full bg-neutral-400" />
            <span className="h-2 w-1/3 rounded-full bg-neutral-600" />
          </div>
          <span className="h-px w-full bg-neutral-800" />
          <div className="flex gap-2">
            <span className="h-4 w-4 rounded-full bg-neutral-600 ring-2 ring-neutral-400 ring-offset-2 ring-offset-neutral-950" />
            <span className="h-4 w-4 rounded-full bg-neutral-700" />
            <span className="h-4 w-4 rounded-full bg-neutral-800" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-20 items-center justify-between rounded-md border border-neutral-700 px-2">
              <span className="h-0.5 w-2 bg-neutral-500" />
              <span className="h-3 w-1.5 rounded-sm bg-neutral-400" />
              <span className="relative flex h-2 w-2 items-center justify-center">
                 <span className="absolute h-2 w-0.5 bg-neutral-500" />
                 <span className="absolute h-0.5 w-2 bg-neutral-500" />
              </span>
            </div>
          </div>
          <div className="mt-2 h-8 w-full rounded-md bg-neutral-100 shadow-md flex items-center justify-center">
             <span className="h-1.5 w-1/3 rounded-full bg-neutral-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main: State Machine ---------- */
export default function EcommercePreview() {
  const [stageIndex, setStageIndex] = useState(0);
  const [products, setProducts] = useState(BASE_PRODUCTS);
  const [newProduct, setNewProduct] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const timers = useRef([]);
  const loopCount = useRef(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    const { key: stage, duration } = STAGES[stageIndex];

    if (stage === "create") {
      const glyph = GLYPHS[loopCount.current % GLYPHS.length];
      setNewProduct({ id: `p-${++uid}`, glyph });
    }

    if (stage === "created") {
      setProducts((prev) => {
        if (!newProduct || prev.some((p) => p.id === newProduct.id)) return prev;
        // قرار دادن محصول جدید در انتها (یا ابتدا) به نحوی که گرید پر شود
        return [newProduct, ...prev.slice(0, 2)];
      });
    }

    if (stage === "store") {
      const t = setTimeout(() => setSelecting(true), Math.max(duration - 650, 0));
      timers.current.push(t);
    } else {
      setSelecting(false);
    }

    const advance = setTimeout(() => {
      setStageIndex((i) => {
        const next = (i + 1) % STAGES.length;
        if (next === 0) {
          loopCount.current += 1;
          setProducts(BASE_PRODUCTS);
          setNewProduct(null);
        }
        return next;
      });
    }, duration);
    timers.current.push(advance);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  useEffect(() => clearTimers, [clearTimers]);

  const stageKey = STAGES[stageIndex].key;

  // ترنزیشن‌های ورود و خروج پریمیوم (ترکیب Opacity, Scale و Blur بسیار ظریف)
  const screenVariants = {
    initial: { opacity: 0, y: 6, scale: 0.985, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -4, scale: 0.99, filter: "blur(0px)" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-900/80 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={stageKey}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: EASE }}
          className="h-full w-full"
        >
          {stageKey === "dashboard" && <DashboardPreview products={products} />}
          {stageKey === "create" && (
            <CreateProductPreview glyph={newProduct?.glyph ?? GLYPHS[0]} />
          )}
          {stageKey === "created" && (
            <ProductCreatedPreview products={products} newId={newProduct?.id} />
          )}
          {(stageKey === "store" || stageKey === "store2") && (
            <StorePreview products={products} newId={newProduct?.id} isSelecting={selecting} />
          )}
          {stageKey === "detail" && (
            <ProductDetailPreview
              product={products.find((p) => p.id === newProduct?.id) ?? newProduct}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}