"use client";

import { useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { useConfigurator } from "@/hooks/useConfigurator";
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_TYPES_LABEL,
  MAX_FILE_SIZE_MB,
} from "../Configurator.constants";

export function UploadStep() {
  const { state, dispatch } = useConfigurator();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return;
      const url = URL.createObjectURL(file);
      dispatch({ type: "SET_FILE", file, previewUrl: url });
    },
    [dispatch]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearFile = useCallback(() => {
    dispatch({ type: "CLEAR_FILE" });
    if (inputRef.current) inputRef.current.value = "";
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
        1. Upload Design
      </h3>

      {state.previewUrl ? (
        <div className="relative rounded-2xl border border-[#2A7A6F]/20 overflow-hidden">
          <img
            src={state.previewUrl}
            alt="Design preview"
            className="w-full aspect-[4/3] object-contain bg-[#FFF9F4] p-4"
          />
          <button
            onClick={clearFile}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#2C1A0E]/8 flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-4 h-4 text-[#2C1A0E]" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="rounded-2xl border-2 border-dashed border-[#2A7A6F]/30 bg-[#FFF9F4] p-10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#2A7A6F]/50 hover:bg-[#FFF0E8]/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#2A7A6F]/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-[#2A7A6F]" />
          </div>
          <p className="text-sm font-medium text-[#2C1A0E]">
            Drag & drop your design or{" "}
            <span className="text-[#2A7A6F] underline">browse</span>
          </p>
          <p className="text-xs text-[#7A6458]">
            {ACCEPTED_FILE_TYPES_LABEL} — Max {MAX_FILE_SIZE_MB}MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleChange}
        className="hidden"
      />

      <a
        href="#artwork-guidelines"
        className="inline-block mt-3 text-xs text-[#2A7A6F] hover:text-[#1F5C53] underline transition-colors"
      >
        Need help with artwork?
      </a>
    </div>
  );
}
