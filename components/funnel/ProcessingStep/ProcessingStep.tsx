"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROCESSING_STEPS } from "@/components/funnel/FunnelFlow/FunnelFlow.constants";

interface ProcessingStepProps {
  image: string | null;
  file: File | null;
  occasion: string | null;
  onDone: (images: string[][]) => void;
}

export function ProcessingStep({
  image,
  file,
  occasion,
  onDone,
}: ProcessingStepProps) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const hasFiredRef = useRef(false);

  // Fake progress: +1 every 600ms → 100 in ~60s
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        setStepIdx(Math.floor((next / 100) * PROCESSING_STEPS.length));
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Real API call
  useEffect(() => {
    if (!file || hasFiredRef.current) return;
    hasFiredRef.current = true;

    const formData = new FormData();
    formData.append("image", file);
    if (occasion) formData.append("occasion", occasion);

    fetch("/api/astria/tune", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        const images: string[][] = data.error ? [] : data.images;
        // Wait for fake progress to finish, then advance
        const waitForProgress = () => {
          setProgress((p) => {
            if (p >= 100) {
              setTimeout(() => onDone(images), 500);
              return p;
            }
            // Force complete
            setTimeout(() => {
              setProgress(100);
              setTimeout(() => onDone(images), 500);
            }, 300);
            return p;
          });
        };
        waitForProgress();
      })
      .catch(() => {
        setProgress(100);
        setTimeout(() => onDone([]), 500);
      });
  }, [file, onDone]);

  // If no API call (no file), just advance on 100%
  useEffect(() => {
    if (!file && progress >= 100) {
      setTimeout(() => onDone([]), 500);
    }
  }, [file, progress, onDone]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 font-sans">
      <style>{`
        @keyframes ping-ring { 0%,100%{transform:scale(1);opacity:0.25} 50%{transform:scale(1.08);opacity:0.5} }
        @keyframes scan-line { 0%{top:0%} 50%{top:85%} 100%{top:0%} }
      `}</style>

      <div className="w-full max-w-[360px] text-center">
        {/* Image with pulsing rings */}
        <div className="relative mx-auto mb-8 h-[140px] w-[140px]">
          <div
            className="absolute rounded-full border-[3px] border-[#2a7a6f]"
            style={{
              inset: -8,
              opacity: 0.25,
              animation: "ping-ring 1.5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full border-2 border-[#2a7a6f]"
            style={{
              inset: -16,
              opacity: 0.12,
              animation: "ping-ring 1.5s ease-in-out infinite 0.3s",
            }}
          />
          {image && (
            <Image
              src={image}
              alt="preview"
              width={140}
              height={140}
              className="relative z-[1] h-[140px] w-[140px] rounded-full border-4 border-white object-cover shadow-[0_8px_32px_rgba(42,122,111,0.2)]"
              unoptimized
            />
          )}
          {/* Scanning line */}
          <div
            className="absolute left-0 right-0 z-[2] h-[3px] rounded-sm"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2a7a6f, transparent)",
              animation: "scan-line 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <h2 className="mb-2 text-xl font-extrabold text-[#1a1a1a]">
          Processing your photo
        </h2>
        <p className="mb-7 min-h-[20px] text-sm text-[#888]">
          {PROCESSING_STEPS[Math.min(stepIdx, PROCESSING_STEPS.length - 1)]}
        </p>

        {/* Progress bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
          <div
            className="h-full rounded-full bg-[#2a7a6f]"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <p className="mt-2.5 text-xs font-bold text-[#2a7a6f]">{progress}%</p>
      </div>
    </div>
  );
}
