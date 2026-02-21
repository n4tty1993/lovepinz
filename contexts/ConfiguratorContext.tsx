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
export type EnamelType = "hard" | "soft";
export type ProcessingPhase = "idle" | "uploading" | "processing" | "complete";

export interface ConfiguratorState {
  file: File | null;
  previewUrl: string | null;
  processingPhase: ProcessingPhase;
  size: PinSize;
  quantity: number;
  finish: PinFinish;
  enamelType: EnamelType;
}

export type ConfiguratorAction =
  | { type: "SET_FILE"; file: File; previewUrl: string }
  | { type: "CLEAR_FILE" }
  | { type: "SET_PROCESSING_PHASE"; phase: ProcessingPhase }
  | { type: "SET_SIZE"; size: PinSize }
  | { type: "SET_QUANTITY"; quantity: number }
  | { type: "SET_FINISH"; finish: PinFinish }
  | { type: "SET_ENAMEL_TYPE"; enamelType: EnamelType };

export interface DerivedState extends PricingResult {
  isDesignReady: boolean;
  canAddToCart: boolean;
}

const initialState: ConfiguratorState = {
  file: null,
  previewUrl: null,
  processingPhase: "idle",
  size: "1",
  quantity: 25,
  finish: "gold",
  enamelType: "soft",
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
        processingPhase: "complete",
      };
    case "CLEAR_FILE":
      return {
        ...state,
        file: null,
        previewUrl: null,
        processingPhase: "idle",
      };
    case "SET_PROCESSING_PHASE":
      return { ...state, processingPhase: action.phase };
    case "SET_SIZE":
      return { ...state, size: action.size };
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity };
    case "SET_FINISH":
      return { ...state, finish: action.finish };
    case "SET_ENAMEL_TYPE":
      return { ...state, enamelType: action.enamelType };
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
    const isDesignReady = state.processingPhase === "complete";
    return {
      ...pricing,
      isDesignReady,
      canAddToCart: isDesignReady && state.quantity >= 25,
    };
  }, [state.quantity, state.processingPhase]);

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
