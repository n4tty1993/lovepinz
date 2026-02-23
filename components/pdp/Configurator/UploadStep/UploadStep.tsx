"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useConfigurator } from "@/hooks/useConfigurator";
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_TYPES_LABEL,
  MAX_FILE_SIZE_MB,
  STYLE_OPTIONS,
  WIZARD_STEPS,
  WIZARD_STEP_LABELS,
  PROCESSING_LABELS,
} from "../Configurator.constants";
import type { StyleOption } from "@/contexts/ConfiguratorContext";
import { trackUploadImage } from "@/lib/meta-pixel";

function WizardStepper({ current }: { current: string }) {
  const ci = WIZARD_STEPS.indexOf(current as (typeof WIZARD_STEPS)[number]);

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
          onChange={(e) => validate(e.target.files?.[0])}
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
            <div className="text-[11px] text-[#aaa]">
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
          Process →
        </button>
      </div>
    </div>
  );
}

function ProcessingSubStep({
  previewUrl,
  progress,
}: {
  previewUrl: string;
  progress: number;
}) {
  const blur = Math.max(0, 12 - (progress / 100) * 12);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200 text-center">
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
          <span>{progress < 100 ? "Analyzing..." : "Done!"}</span>
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

function ChooseStyleSubStep({
  previewUrl,
  selectedStyle,
  onSelect,
  onConfirm,
}: {
  previewUrl: string;
  selectedStyle: StyleOption | null;
  onSelect: (id: StyleOption) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
      <p className="text-[13px] text-[#666] mb-3.5">
        Pick a style for your pin design.
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
        {STYLE_OPTIONS.map((opt) => {
          const selected = selectedStyle === opt.id;
          return (
            <div
              key={opt.id}
              className={`rounded-[14px] overflow-hidden cursor-pointer bg-[#f0f0f8] transition-all duration-200 border-[3px] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(42,122,111,0.19)] ${
                selected
                  ? "border-[#2A7A6F] shadow-[0_0_0_4px_rgba(42,122,111,0.13)]"
                  : "border-transparent"
              }`}
              onClick={() => onSelect(opt.id)}
            >
              <Image
                src={previewUrl}
                alt={opt.label}
                width={200}
                height={200}
                unoptimized
                className="w-full aspect-square object-cover block"
                style={{ filter: opt.filter }}
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
                  {opt.label}
                </span>
                {selected && (
                  <span className="w-4 h-4 rounded-full bg-[#2A7A6F] text-white flex items-center justify-center text-[9px] font-extrabold">
                    ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="w-full bg-gradient-to-br from-[#2A7A6F] to-[#1e5c55] text-white border-none rounded-xl px-5 py-3 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(42,122,111,0.4)] hover:opacity-90 hover:-translate-y-px transition-all disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:hover:translate-y-0"
        disabled={!selectedStyle}
        onClick={onConfirm}
      >
        Apply Style →
      </button>
    </div>
  );
}

function ResultSubStep({
  previewUrl,
  selectedStyle,
  onReset,
}: {
  previewUrl: string;
  selectedStyle: StyleOption;
  onReset: () => void;
}) {
  const opt = STYLE_OPTIONS.find((o) => o.id === selectedStyle);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
      <div className="flex gap-3 items-center bg-green-50 rounded-xl p-3 mb-3.5 border border-green-200">
        <div className="rounded-[10px] overflow-hidden shrink-0">
          <Image
            src={previewUrl}
            alt="Final design"
            width={60}
            height={60}
            unoptimized
            className="w-[60px] h-[60px] object-cover block"
            style={{ filter: opt?.filter }}
          />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-extrabold text-green-600">
            ✓ Design ready!
          </div>
          <div className="text-xs text-[#555] mt-0.5">
            Style: <strong className="text-[#2A7A6F]">{opt?.label}</strong>
          </div>
        </div>
        <button
          className="bg-transparent border-2 border-[#e5e7eb] rounded-xl px-3 py-1.5 text-[11px] font-semibold text-[#555] hover:border-[#2A7A6F] hover:text-[#2A7A6F] transition-colors cursor-pointer"
          onClick={onReset}
        >
          Change
        </button>
      </div>
      <div className="text-xs text-[#888] text-center">
        Your design is set. Continue to choose size, quantity & finish below.
      </div>
    </div>
  );
}

export function UploadStep() {
  const { state, derived, dispatch } = useConfigurator();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.wizardStep !== "processing") return;
    let cancelled = false;
    let prog = 0;

    const tick = () => {
      if (cancelled) return;
      prog = Math.min(100, prog + Math.random() * 7 + 2);
      dispatch({
        type: "SET_WIZARD_PROGRESS",
        progress: Math.round(prog),
      });
      if (prog < 100) {
        setTimeout(tick, 70 + Math.random() * 130);
      } else {
        setTimeout(() => {
          if (!cancelled) dispatch({ type: "WIZARD_PROCESSING_DONE" });
        }, 400);
      }
    };

    setTimeout(tick, 250);
    return () => {
      cancelled = true;
    };
  }, [state.wizardStep, dispatch]);

  const handleFile = useCallback(
    (file: File, url: string) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files supported (PNG, JPG, SVG, etc.).");
        return;
      }
      setError(null);
      dispatch({ type: "SET_FILE", file, previewUrl: url });
      trackUploadImage();
    },
    [dispatch],
  );

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className={`w-[26px] h-[26px] rounded-full inline-flex items-center justify-center font-extrabold text-xs text-white shrink-0 ${
            derived.isDesignReady ? "bg-green-500" : "bg-[#2A7A6F]"
          }`}
        >
          {derived.isDesignReady ? "✓" : "1"}
        </span>
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
          onNext={() => dispatch({ type: "WIZARD_START_PROCESSING" })}
          onRemove={() => {
            dispatch({ type: "CLEAR_FILE" });
            setError(null);
          }}
        />
      )}

      {state.wizardStep === "processing" && state.previewUrl && (
        <ProcessingSubStep
          previewUrl={state.previewUrl}
          progress={state.wizardProgress}
        />
      )}

      {state.wizardStep === "choose" && state.previewUrl && (
        <ChooseStyleSubStep
          previewUrl={state.previewUrl}
          selectedStyle={state.selectedStyle}
          onSelect={(id) => dispatch({ type: "SET_SELECTED_STYLE", style: id })}
          onConfirm={() => dispatch({ type: "WIZARD_CONFIRM_STYLE" })}
        />
      )}

      {state.wizardStep === "result" &&
        state.previewUrl &&
        state.selectedStyle && (
          <ResultSubStep
            previewUrl={state.previewUrl}
            selectedStyle={state.selectedStyle}
            onReset={() => dispatch({ type: "WIZARD_RESET" })}
          />
        )}
    </div>
  );
}
