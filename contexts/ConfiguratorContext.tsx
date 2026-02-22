"use client";

import {
  createContext,
  useReducer,
  useMemo,
  type ReactNode,
  type Dispatch,
} from "react";
import { calculatePricing } from "@/core/pricing";
import type { PricingResult } from "@/core/pricing.types";

export type PinSize = "1" | "1.25" | "1.5" | "2";
export type PinFinish = "gold" | "silver" | "black-nickel" | "rose-gold";

export type ProcessingPhase = "idle" | "uploading" | "processing" | "complete";
export type WizardStep = "upload" | "processing" | "choose" | "result";
export type StyleOption = "original" | "vivid" | "noir" | "warm";

export interface ConfiguratorState {
  file: File | null;
  previewUrl: string | null;
  processingPhase: ProcessingPhase;
  wizardStep: WizardStep;
  wizardProgress: number;
  selectedStyle: StyleOption | null;
  size: PinSize;
  quantity: number;
  finish: PinFinish;
}

export type ConfiguratorAction =
  | { type: "SET_FILE"; file: File; previewUrl: string }
  | { type: "CLEAR_FILE" }
  | { type: "SET_PROCESSING_PHASE"; phase: ProcessingPhase }
  | { type: "SET_WIZARD_STEP"; step: WizardStep }
  | { type: "SET_WIZARD_PROGRESS"; progress: number }
  | { type: "SET_SELECTED_STYLE"; style: StyleOption }
  | { type: "WIZARD_START_PROCESSING" }
  | { type: "WIZARD_PROCESSING_DONE" }
  | { type: "WIZARD_CONFIRM_STYLE" }
  | { type: "WIZARD_RESET" }
  | { type: "SET_SIZE"; size: PinSize }
  | { type: "SET_QUANTITY"; quantity: number }
  | { type: "SET_FINISH"; finish: PinFinish };

export interface DerivedState extends PricingResult {
  isDesignReady: boolean;
  canAddToCart: boolean;
}

const initialState: ConfiguratorState = {
  file: null,
  previewUrl: null,
  processingPhase: "idle",
  wizardStep: "upload",
  wizardProgress: 0,
  selectedStyle: null,
  size: "1",
  quantity: 25,
  finish: "gold",
};

function configuratorReducer(
  state: ConfiguratorState,
  action: ConfiguratorAction
): ConfiguratorState {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...state,
        file: action.file,
        previewUrl: action.previewUrl,
      };
    case "CLEAR_FILE":
      return {
        ...state,
        file: null,
        previewUrl: null,
        processingPhase: "idle",
        wizardStep: "upload",
        wizardProgress: 0,
        selectedStyle: null,
      };
    case "SET_PROCESSING_PHASE":
      return { ...state, processingPhase: action.phase };
    case "SET_WIZARD_STEP":
      return { ...state, wizardStep: action.step };
    case "SET_WIZARD_PROGRESS":
      return { ...state, wizardProgress: action.progress };
    case "SET_SELECTED_STYLE":
      return { ...state, selectedStyle: action.style };
    case "WIZARD_START_PROCESSING":
      return { ...state, wizardStep: "processing", wizardProgress: 0 };
    case "WIZARD_PROCESSING_DONE":
      return { ...state, wizardStep: "choose" };
    case "WIZARD_CONFIRM_STYLE":
      return { ...state, wizardStep: "result", processingPhase: "complete" };
    case "WIZARD_RESET":
      return {
        ...state,
        file: null,
        previewUrl: null,
        processingPhase: "idle",
        wizardStep: "upload",
        wizardProgress: 0,
        selectedStyle: null,
      };
    case "SET_SIZE":
      return { ...state, size: action.size };
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity };
    case "SET_FINISH":
      return { ...state, finish: action.finish };
    default:
      return state;
  }
}

export const ConfiguratorContext = createContext<{
  state: ConfiguratorState;
  derived: DerivedState;
  dispatch: Dispatch<ConfiguratorAction>;
} | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);

  const derived = useMemo<DerivedState>(() => {
    const pricing = calculatePricing(state.quantity);
    const isDesignReady =
      state.processingPhase === "complete" && state.wizardStep === "result";
    return {
      ...pricing,
      isDesignReady,
      canAddToCart: isDesignReady && state.quantity >= 25,
    };
  }, [state.quantity, state.processingPhase, state.wizardStep]);

  const value = useMemo(
    () => ({ state, derived, dispatch }),
    [state, derived]
  );

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}
