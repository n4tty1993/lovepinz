"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TIPS } from "@/components/funnel/FunnelFlow/FunnelFlow.constants";
import { FunnelNav } from "@/components/funnel/FunnelNav/FunnelNav";
import { trackUploadImage } from "@/lib/meta-pixel";

interface UploadPhotoStepProps {
  occasionLabel: string;
  image: string | null;
  onImageSet: (dataUrl: string, file: File) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function UploadPhotoStep({
  occasionLabel,
  image,
  onImageSet,
  onContinue,
  onBack,
}: UploadPhotoStepProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSet(result, file);
        trackUploadImage();
      };
      reader.readAsDataURL(file);
    },
    [onImageSet],
  );

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <FunnelNav step={1} total={4} label="Upload Photo" onBack={onBack} />

      <div className="mx-auto box-border flex w-full max-w-[480px] flex-1 flex-col gap-5 px-5 pb-8 pt-6">
        <div>
          <h1 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.4px] text-[#1a1a1a]">
            Upload your photo
          </h1>
          <p className="text-sm leading-normal text-[#888]">
            We&apos;ll turn it into a stunning enamel pin for your{" "}
            <strong className="text-[#2a7a6f]">{occasionLabel}</strong>
          </p>
        </div>

        <div className="flex justify-center">
          <div
            onClick={() => !image && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={cn(
              "relative flex aspect-square w-3/4 flex-col items-center justify-center overflow-hidden rounded-[20px] border-[2.5px] border-dashed transition-all duration-200",
              image || dragOver
                ? "border-[#2a7a6f] bg-[#f0faf8]"
                : "cursor-pointer border-[#d8d8d8] bg-[#fafafa]",
            )}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt="preview"
                  fill
                  className="rounded-[18px] object-cover"
                  unoptimized
                />
                <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#2a7a6f]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3.5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f4f2]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a7a6f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="mb-1 text-[15px] font-bold text-[#1a1a1a]">
                  Tap to upload a photo
                </p>
                <p className="text-xs text-[#aaa]">
                  JPG, PNG or HEIC · Max 20MB
                </p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>
        </div>

        {image && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mx-auto block text-sm text-[#888] underline underline-offset-2 hover:text-[#555]"
          >
            Change Photo
          </button>
        )}

        <div className="rounded-2xl bg-[#f8fffe] p-3.5 px-4">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.5px] text-[#2a7a6f]">
            Tips for best results
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIPS.map((t, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-sm">{t.icon}</span>
                <span className="text-xs leading-[1.4] text-[#666]">
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => image && onContinue()}
          disabled={!image}
          className={cn(
            "w-full rounded-full py-4 text-base font-bold transition-all duration-200",
            image
              ? "cursor-pointer bg-[#2a7a6f] text-white shadow-[0_4px_16px_rgba(42,122,111,0.3)]"
              : "cursor-not-allowed bg-[#e0e0e0] text-[#aaa]",
          )}
        >
          {image ? "Continue" : "Upload a photo to continue"}
        </button>
      </div>
    </div>
  );
}
