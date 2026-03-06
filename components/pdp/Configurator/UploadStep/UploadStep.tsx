"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useConfigurator } from "@/hooks/useConfigurator";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_TYPES_LABEL,
  MAX_FILE_SIZE_MB,
  WIZARD_STEPS,
  WIZARD_STEP_LABELS,
  UPLOAD_ALIAS_STEPS,
  PROCESSING_LABELS,
  COUPON_CODE,
  COUPON_DISCOUNT_RATE,
  WEBHOOK_EMAIL_PDP,
} from "../Configurator.constants";
import { trackUploadImage } from "@/lib/meta-pixel";

function WizardStepper({ current }: { current: string }) {
  const display = (UPLOAD_ALIAS_STEPS as readonly string[]).includes(current)
    ? "upload"
    : current;
  const ci = WIZARD_STEPS.indexOf(display as (typeof WIZARD_STEPS)[number]);

  return (
    <div className="flex items-center justify-between mb-5">
      {WIZARD_STEPS.map((step, i) => {
        const done = i < ci;
        const active = i === ci;

        return (
          <div
            key={step}
            className="flex items-center"
            style={{ flex: i < WIZARD_STEPS.length - 1 ? 1 : "none" }}
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-[#2A7A6F] text-white"
                    : active
                      ? "bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white shadow-[0_0_0_4px_rgba(42,122,111,0.13)]"
                      : "bg-[#e5e7eb] text-[#bbb]"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <div
                className={`text-[9px] whitespace-nowrap ${
                  active
                    ? "font-bold text-[#2A7A6F]"
                    : done
                      ? "font-normal text-[#666]"
                      : "font-normal text-[#bbb]"
                }`}
              >
                {WIZARD_STEP_LABELS[step]}
              </div>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <div
                className={`flex-1 h-[2px] rounded-sm mx-1.5 mb-3 transition-colors duration-300 ${
                  done ? "bg-[#2A7A6F]" : "bg-[#e5e7eb]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function UploadSubStep({
  previewUrl,
  error,
  onFile,
  onNext,
  onRemove,
}: {
  previewUrl: string | null;
  error: string | null;
  onFile: (file: File, url: string) => void;
  onNext: () => void;
  onRemove: () => void;
}) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return;
    onFile(file, URL.createObjectURL(file));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
      <div
        className={`rounded-[14px] border-[2.5px] border-dashed transition-colors cursor-pointer p-7 text-center ${
          over
            ? "border-[#2A7A6F] bg-[#edf5ea]"
            : "border-[#b2d8d4] hover:border-[#2A7A6F]/60"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          validate(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          className="hidden"
          onChange={(e) => {
            validate(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={280}
            height={140}
            unoptimized
            className="max-h-[140px] max-w-full rounded-[10px] object-contain mx-auto"
          />
        ) : (
          <>
            <div className="text-4xl mb-2">🖼️</div>
            <div className="font-bold text-[#2A7A6F] text-sm mb-1">
              Tap to upload your design
            </div>
            <div className="text-[11px] text-[#aaa] mb-2">
              {ACCEPTED_FILE_TYPES_LABEL}
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="mt-2.5 px-3 py-2 bg-red-50 rounded-lg text-red-600 text-xs font-semibold border border-red-200">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-2.5 mt-3.5">
        <div className="flex gap-2">
          <button
            className="bg-transparent border-2 border-[#e5e7eb] rounded-xl px-4 py-2 text-xs font-semibold text-[#555] hover:border-[#2A7A6F] hover:text-[#2A7A6F] transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Browse
          </button>
          {previewUrl && (
            <button
              className="bg-transparent border-2 border-red-200 rounded-xl px-4 py-2 text-xs font-semibold text-red-600 hover:border-red-400 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              Remove
            </button>
          )}
        </div>
        <button
          className="bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white border-none rounded-xl px-5 py-2.5 text-[13px] font-bold cursor-pointer shadow-[0_4px_14px_rgba(42,122,111,0.4)] hover:opacity-90 hover:-translate-y-px transition-all disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:hover:translate-y-0"
          disabled={!previewUrl}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          Process
        </button>
      </div>
    </div>
  );
}

function CouponCard() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(COUPON_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-[#fffbeb] border-[1.5px] border-dashed border-[#fbbf24] rounded-xl px-4 py-3.5 text-center mb-4">
      <div className="text-[11px] font-bold text-[#a16207] mb-2 tracking-wide">
        🎉 YOUR COUPON HAS BEEN APPLIED
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 text-center">
          <div className="font-black text-xl tracking-[3px] text-[#1e1e2e]">
            {COUPON_CODE}
          </div>
          <div className="text-[10px] text-[#a16207] mt-0.5">
            ⏱ Valid for 24 hours · First order only
          </div>
        </div>
        <button
          onClick={copy}
          className="shrink-0 border-none rounded-lg px-4 py-2.5 font-extrabold text-xs cursor-pointer transition-colors whitespace-nowrap shadow-[0_4px_12px_rgba(240,192,96,0.3)]"
          style={{
            background: copied ? "#22c55e" : "#F0C060",
            color: copied ? "#fff" : "#1e1e2e",
          }}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function ProcessingSubStep({
  previewUrl,
  progress,
  hasCoupon,
}: {
  previewUrl: string;
  progress: number;
  hasCoupon: boolean;
}) {
  const blur = Math.max(0, 12 - (progress / 100) * 12);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-center">
      {hasCoupon && <CouponCard />}

      <div className="relative inline-block rounded-[14px] overflow-hidden mb-4">
        <Image
          src={previewUrl}
          alt="Processing"
          width={280}
          height={160}
          unoptimized
          className="block max-h-[160px] max-w-full rounded-[14px] transition-[filter] duration-200"
          style={{ filter: `blur(${blur}px)` }}
        />
        <div
          className="absolute inset-0 rounded-[14px] transition-colors duration-200 pointer-events-none"
          style={{
            background: `rgba(42,122,111,${0.15 * (1 - progress / 100)})`,
          }}
        />
      </div>

      <div className="mb-3.5">
        <div className="flex justify-between mb-1.5 text-xs font-semibold text-[#2A7A6F]">
          <span>{progress < 100 ? "Generating designs..." : "Done!"}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[7px] bg-[#edf5ea] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2A7A6F] to-[#b2d8d4] rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-1.5 justify-center flex-wrap">
        {PROCESSING_LABELS.map((label, i) => {
          const done = progress >= (i + 1) * 25;
          return (
            <div
              key={label}
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                done
                  ? "bg-[#edf5ea] text-[#2A7A6F]"
                  : "bg-[#f3f4f6] text-[#ccc]"
              }`}
            >
              {done ? "✓ " : ""}
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ZoomModal({
  images,
  initialIndex,
  selectedIndex,
  onSelect,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const total = images.length;
  const src = images[idx];

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const onPointerDown = (e: React.PointerEvent) => setDragStart(e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    const d = e.clientX - dragStart;
    if (Math.abs(d) > 40) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      d < 0 ? next() : prev();
    }
    setDragStart(null);
  };

  if (!src) return null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/88 backdrop-blur-lg" />
      <DialogContent
        showCloseButton={false}
        className="bg-transparent ring-0 shadow-none max-w-[420px] p-0 gap-0"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <DialogTitle className="sr-only">Design option {idx + 1}</DialogTitle>

        <div className="relative">
          {/* Main image */}
          <Image
            key={idx}
            src={src}
            alt={`Design option ${idx + 1}`}
            width={420}
            height={420}
            unoptimized
            className="w-full aspect-square object-contain rounded-[18px] block animate-in zoom-in-95 duration-200"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}
          />
        </div>

        {/* Label */}
        <div className="text-center mt-3.5 text-white font-extrabold text-[15px]">
          Option {idx + 1}
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-2.5">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setIdx(i)}
                className="rounded cursor-pointer transition-all duration-200"
                style={{
                  width: i === idx ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: i === idx ? "#fff" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 mt-3.5 justify-center">
            {images.map((thumbSrc, i) => (
              <div
                key={i}
                onClick={() => setIdx(i)}
                className="w-[52px] h-[52px] rounded-[10px] overflow-hidden cursor-pointer shrink-0 transition-all duration-200"
                style={{
                  border: `2.5px solid ${i === idx ? "#fff" : "transparent"}`,
                  opacity: i === idx ? 1 : 0.55,
                }}
              >
                <Image
                  src={thumbSrc}
                  alt={`Option ${i + 1}`}
                  width={52}
                  height={52}
                  unoptimized
                  className="w-full h-full object-cover block"
                />
              </div>
            ))}
          </div>
        )}

        {/* Select button */}
        <div className="mt-3.5">
          <button
            onClick={() => {
              onSelect(idx);
              onClose();
            }}
            className="w-full py-3 rounded-xl border-none cursor-pointer font-extrabold text-sm bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white hover:opacity-[0.88] transition-opacity"
            style={{ boxShadow: "0 4px 14px rgba(42,122,111,0.6)" }}
          >
            {selectedIndex === idx ? "✓ Selected" : `Choose Option ${idx + 1}`}
          </button>
        </div>

        {/* Hint */}
        <div className="text-center mt-2.5 text-white/[0.35] text-[11px]">
          ← → keys or swipe · Esc to close
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChooseStyleSubStep({
  generatedImages,
  selectedIndex,
  onSelect,
  onConfirm,
}: {
  generatedImages: string[][];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onConfirm: () => void;
}) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const flatImages = generatedImages.map((imgs) => imgs[0]).filter(Boolean);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
      {zoomedIndex !== null && flatImages.length > 0 && (
        <ZoomModal
          images={flatImages}
          initialIndex={zoomedIndex}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          onClose={() => setZoomedIndex(null)}
        />
      )}
      <p className="text-[13px] text-[#666] mb-3.5">
        Pick a design for your pin.
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
        {generatedImages.map((images, i) => {
          const selected = selectedIndex === i;
          const src = images[0];
          if (!src) return null;
          return (
            <div
              key={i}
              className={`rounded-[14px] overflow-hidden cursor-pointer bg-[#f0f0f8] transition-all duration-200 border-[3px] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(42,122,111,0.19)] ${
                selected
                  ? "border-[#2A7A6F] shadow-[0_0_0_4px_rgba(42,122,111,0.13)]"
                  : "border-transparent"
              }`}
              onClick={() => onSelect(i)}
            >
              <Image
                src={src}
                alt={`Design option ${i + 1}`}
                width={200}
                height={200}
                unoptimized
                className="w-full aspect-square object-cover block"
              />
              <div
                className={`px-2.5 py-2 flex items-center justify-between ${
                  selected ? "bg-[#edf5ea]" : "bg-[#fafafa]"
                }`}
              >
                <span
                  className={`font-bold text-xs ${
                    selected ? "text-[#2A7A6F]" : "text-[#333]"
                  }`}
                >
                  Option {i + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  {selected && (
                    <span className="w-4 h-4 rounded-full bg-[#2A7A6F] text-white flex items-center justify-center text-[9px] font-extrabold">
                      ✓
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedIndex(i);
                    }}
                    className="bg-transparent border-none cursor-pointer p-0 text-[11px] text-[#2A7A6F] font-bold underline leading-none"
                  >
                    Zoom In
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="w-full bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white border-none rounded-xl px-5 py-3 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(42,122,111,0.4)] hover:opacity-90 hover:-translate-y-px transition-all disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:hover:translate-y-0"
        disabled={selectedIndex === null}
        onClick={onConfirm}
      >
        Select Design →
      </button>
    </div>
  );
}

function ResultSubStep({
  selectedImageUrl,
  onReset,
}: {
  selectedImageUrl: string;
  onReset: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
      {zoomed && (
        <ZoomModal
          images={[selectedImageUrl]}
          initialIndex={0}
          selectedIndex={0}
          onSelect={() => {}}
          onClose={() => setZoomed(false)}
        />
      )}
      <div className="flex gap-3 items-center bg-green-50 rounded-xl p-3 mb-3.5 border border-green-200">
        <div
          className="rounded-[10px] overflow-hidden shrink-0 cursor-zoom-in transition-transform hover:scale-105"
          onClick={() => setZoomed(true)}
        >
          <Image
            src={selectedImageUrl}
            alt="Final design"
            width={60}
            height={60}
            unoptimized
            className="w-[60px] h-[60px] object-cover block"
          />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-extrabold text-green-600">
            ✓ Design ready!
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            className="bg-transparent border-2 border-[#e5e7eb] rounded-xl px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:border-[#2A7A6F] hover:text-[#2A7A6F] transition-colors cursor-pointer"
            onClick={onReset}
          >
            Change
          </button>
          <button
            onClick={() => setZoomed(true)}
            className="bg-transparent border-none p-0 text-[11px] text-[#2A7A6F] font-bold cursor-pointer underline"
          >
            Zoom In
          </button>
        </div>
      </div>
      <div className="text-xs text-[#888] text-center">
        Your design is set. Continue to choose size, quantity & finish below.
      </div>
    </div>
  );
}

function EmailSubStep({
  onSubmit,
  onSkip,
}: {
  onSubmit: (email: string) => void;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validate = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = () => {
    if (!email.trim()) {
      onSkip();
      return;
    }
    if (!validate()) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    fetch(WEBHOOK_EMAIL_PDP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "pdp" }),
    }).catch(() => {});

    timerRef.current = setTimeout(() => onSubmit(email), 800);
  };

  const discountPercent = Math.round(COUPON_DISCOUNT_RATE * 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-center py-1.5">
      <div className="text-4xl mb-2.5">🎁</div>
      <div className="font-black text-base text-[#1e1e2e] mb-1.5">
        Almost there!
      </div>
      <div className="text-[13px] text-[#777] mb-5 leading-relaxed">
        Enter your email and get{" "}
        <strong className="text-[#2A7A6F]">{discountPercent}% off</strong> your
        first order.
      </div>
      <div className="text-left mb-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full h-[46px] rounded-xl px-3.5 text-sm text-[#1e1e2e] outline-none transition-colors font-[inherit]"
          style={{
            border: `1.5px solid ${error ? "#fca5a5" : email && validate() ? "#86efac" : "#e5e7eb"}`,
          }}
        />
        {error && (
          <div className="mt-1.5 text-[11px] text-red-600 font-semibold">
            ⚠️ {error}
          </div>
        )}
      </div>
      <button
        className="w-full bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white border-none rounded-xl py-3 text-[15px] font-bold cursor-pointer shadow-[0_4px_14px_rgba(42,122,111,0.4)] hover:opacity-90 transition-all disabled:opacity-[0.38] disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-2.5"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full animate-spin" />
            Applying…
          </>
        ) : (
          `Get ${discountPercent}% Off & Continue →`
        )}
      </button>
      <button
        onClick={onSkip}
        className="bg-transparent border-none w-full text-center text-[13px] text-[#888] cursor-pointer py-1 mb-1 underline font-semibold"
      >
        Skip for now
      </button>
      <div className="text-[11px] text-[#bbb] flex items-center justify-center gap-1.5">
        <span>🔒</span> We never spam. Unsubscribe anytime.
      </div>
    </div>
  );
}

export function UploadStep() {
  const { state, derived, dispatch } = useConfigurator();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.wizardStep !== "processing") return;
    if (!state.file) return;
    let cancelled = false;
    let prog = 0;

    // Start fake progress animation — linear over 50 seconds (1% every 500ms, cap at 90%)
    const interval = setInterval(() => {
      if (cancelled) return;
      prog = Math.min(90, prog + 1);
      dispatch({
        type: "SET_WIZARD_PROGRESS",
        progress: Math.round(prog),
      });
      if (prog >= 90) clearInterval(interval);
    }, 500);

    // Send image to Astria via API route
    const formData = new FormData();
    formData.append("image", state.file);

    fetch("/api/astria/tune", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          console.error("Astria tune error:", data.error);
        } else {
          console.log("Astria images received:", data);
          dispatch({ type: "SET_GENERATED_IMAGES", images: data.images });
        }
        dispatch({ type: "SET_WIZARD_PROGRESS", progress: 100 });
        setTimeout(() => {
          if (!cancelled) dispatch({ type: "WIZARD_PROCESSING_DONE" });
        }, 400);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Astria tune error:", err);
        dispatch({ type: "SET_WIZARD_PROGRESS", progress: 100 });
        setTimeout(() => {
          if (!cancelled) dispatch({ type: "WIZARD_PROCESSING_DONE" });
        }, 400);
      });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [state.wizardStep, state.file, dispatch]);

  const handleFile = useCallback(
    (file: File, url: string) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files supported (JPG, JPEG, PNG).");
        return;
      }
      setError(null);
      dispatch({ type: "SET_FILE", file, previewUrl: url });
      trackUploadImage();
    },
    [dispatch],
  );

  const selectedImageUrl =
    state.selectedImageIndex !== null &&
    state.generatedImages[state.selectedImageIndex]?.[0];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="font-bold text-base">Upload & Style Your Design</span>
        {derived.isDesignReady && (
          <span className="ml-auto text-[11px] text-green-500 font-bold bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
            ✓ Complete
          </span>
        )}
      </div>

      <WizardStepper current={state.wizardStep} />

      {state.wizardStep === "upload" && (
        <UploadSubStep
          previewUrl={state.previewUrl}
          error={error}
          onFile={handleFile}
          onNext={() => dispatch({ type: "WIZARD_START_EMAIL" })}
          onRemove={() => {
            dispatch({ type: "CLEAR_FILE" });
            setError(null);
          }}
        />
      )}

      {state.wizardStep === "email" && (
        <EmailSubStep
          onSubmit={(email) => dispatch({ type: "WIZARD_SUBMIT_EMAIL", email })}
          onSkip={() => dispatch({ type: "WIZARD_SKIP_EMAIL" })}
        />
      )}

      {state.wizardStep === "processing" && state.previewUrl && (
        <ProcessingSubStep
          previewUrl={state.previewUrl}
          progress={state.wizardProgress}
          hasCoupon={state.hasCoupon}
        />
      )}

      {state.wizardStep === "choose" && state.generatedImages.length > 0 && (
        <ChooseStyleSubStep
          generatedImages={state.generatedImages}
          selectedIndex={state.selectedImageIndex}
          onSelect={(index) => dispatch({ type: "SET_SELECTED_IMAGE", index })}
          onConfirm={() => dispatch({ type: "WIZARD_CONFIRM_STYLE" })}
        />
      )}

      {state.wizardStep === "result" && selectedImageUrl && (
        <ResultSubStep
          selectedImageUrl={selectedImageUrl}
          onReset={() => dispatch({ type: "WIZARD_RESET" })}
        />
      )}
    </div>
  );
}
