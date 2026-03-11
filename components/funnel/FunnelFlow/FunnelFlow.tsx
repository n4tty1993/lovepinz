"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_EXPO_OUT } from "@/constants/animations";
import type { FunnelState, PinStyleOption } from "./FunnelFlow.types";
import { OCCASIONS, PIN_STYLES } from "./FunnelFlow.constants";
import { OccasionStep } from "@/components/funnel/OccasionStep/OccasionStep";
import { UploadPhotoStep } from "@/components/funnel/UploadPhotoStep/UploadPhotoStep";
import { ProcessingStep } from "@/components/funnel/ProcessingStep/ProcessingStep";
import { StylePickerStep } from "@/components/funnel/StylePickerStep/StylePickerStep";
import { QuantityPickerStep } from "@/components/funnel/QuantityPickerStep/QuantityPickerStep";
import { OrderSummaryStep } from "@/components/funnel/OrderSummaryStep/OrderSummaryStep";

const INITIAL_STATE: FunnelState = {
  screen: "occasion",
  selectedId: null,
  uploadedImage: null,
  file: null,
  chosenStyle: PIN_STYLES[0],
  chosenQty: 10,
};

export function FunnelFlow() {
  const [state, setState] = useState<FunnelState>(INITIAL_STATE);
  const [generatedImages, setGeneratedImages] = useState<string[][]>([]);
  const prefersReducedMotion = useReducedMotion();

  const opt = OCCASIONS.find((o) => o.id === state.selectedId);

  const handleBack = useCallback(() => {
    setState((prev) => {
      if (prev.screen === "summary")
        return { ...prev, screen: "quantity" as const };
      if (prev.screen === "quantity")
        return { ...prev, screen: "style" as const };
      if (prev.screen === "style")
        return { ...prev, screen: "upload" as const };
      if (prev.screen === "upload")
        return { ...prev, screen: "occasion" as const, selectedId: null };
      return prev;
    });
  }, []);

  const slideOffset = prefersReducedMotion ? 0 : 60;

  const variants = {
    enter: { x: slideOffset, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -slideOffset, opacity: 0 },
  };

  // Processing screen renders without AnimatePresence wrapper for cleaner transitions
  if (state.screen === "processing") {
    return (
      <ProcessingStep
        image={state.uploadedImage}
        file={state.file}
        occasion={state.selectedId}
        onDone={(images) => {
          setGeneratedImages(images);
          setState((prev) => ({ ...prev, screen: "style" }));
        }}
      />
    );
  }

  if (state.screen === "style") {
    return (
      <StylePickerStep
        images={generatedImages}
        onBack={handleBack}
        onContinue={(s: PinStyleOption) => {
          setState((prev) => ({ ...prev, chosenStyle: s, screen: "quantity" }));
        }}
      />
    );
  }

  if (state.screen === "quantity") {
    return (
      <QuantityPickerStep
        qty={state.chosenQty}
        onQtyChange={(q) => setState((prev) => ({ ...prev, chosenQty: q }))}
        onContinue={(q) => {
          setState((prev) => ({ ...prev, chosenQty: q, screen: "summary" }));
        }}
        onBack={handleBack}
      />
    );
  }

  if (state.screen === "summary" && state.chosenStyle) {
    return (
      <OrderSummaryStep
        qty={state.chosenQty}
        style={state.chosenStyle}
        file={state.file}
        previewUrl={state.uploadedImage}
        generatedImages={generatedImages}
        onBack={handleBack}
      />
    );
  }

  if (state.screen === "upload" && opt) {
    return (
      <UploadPhotoStep
        occasionLabel={opt.label}
        image={state.uploadedImage}
        onImageSet={(dataUrl, file) => {
          setState((prev) => ({ ...prev, uploadedImage: dataUrl, file }));
        }}
        onContinue={() => {
          setState((prev) => ({ ...prev, screen: "processing" }));
        }}
        onBack={handleBack}
      />
    );
  }

  // Default: occasion select screen
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="occasion"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: EASE_EXPO_OUT,
        }}
      >
        <OccasionStep
          onSelect={(id) => {
            setState((prev) => ({
              ...prev,
              selectedId: id,
              screen: "upload",
            }));
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
