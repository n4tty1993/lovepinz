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
import { COUPON_DISCOUNT_RATE } from "@/components/pdp/Configurator/Configurator.constants";

export type PinSize = "1" | "1.25" | "1.5" | "2";
export type PinFinish = "gold" | "silver" | "black-nickel" | "rose-gold";

export type ProcessingPhase = "idle" | "uploading" | "processing" | "complete";
export type WizardStep = "upload" | "processing" | "choose" | "result";

export interface ConfiguratorState {
  file: File | null;
  previewUrl: string | null;
  processingPhase: ProcessingPhase;
  wizardStep: WizardStep;
  wizardProgress: number;
  generatedImages: string[][];
  selectedImageIndex: number | null;
  email: string | null;
  hasCoupon: boolean;
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
  | { type: "SET_GENERATED_IMAGES"; images: string[][] }
  | { type: "SET_SELECTED_IMAGE"; index: number }
  | { type: "WIZARD_START_PROCESSING" }
  | { type: "WIZARD_PROCESSING_DONE" }
  | { type: "WIZARD_CONFIRM_STYLE" }
  | { type: "WIZARD_RESET" }
  | { type: "SET_QUANTITY"; quantity: number };

export interface DerivedState extends PricingResult {
  isDesignReady: boolean;
  canAddToCart: boolean;
  couponDiscount: number;
  finalPrice: number;
}

const initialState: ConfiguratorState = {
  file: null,
  previewUrl: null,
  processingPhase: "idle",
  wizardStep: "upload",
  wizardProgress: 0,
  generatedImages: [],
  selectedImageIndex: null,
  email: null,
  hasCoupon: false,
  size: "1",
  quantity: 10,
  finish: "gold",
};

function configuratorReducer(
  state: ConfiguratorState,
  action: ConfiguratorAction,
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
        generatedImages: [],
        selectedImageIndex: null,
        email: null,
        hasCoupon: false,
      };
    case "SET_PROCESSING_PHASE":
      return { ...state, processingPhase: action.phase };
    case "SET_WIZARD_STEP":
      return { ...state, wizardStep: action.step };
    case "SET_WIZARD_PROGRESS":
      return { ...state, wizardProgress: action.progress };
    case "SET_GENERATED_IMAGES":
      return { ...state, generatedImages: action.images };
    case "SET_SELECTED_IMAGE":
      return { ...state, selectedImageIndex: action.index };
    case "WIZARD_START_PROCESSING":
      return { ...state, wizardStep: "processing", wizardProgress: 0 };
    case "WIZARD_PROCESSING_DONE":
      return { ...state, wizardStep: "choose", selectedImageIndex: 0 };
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
        generatedImages: [],
        selectedImageIndex: null,
        email: null,
        hasCoupon: false,
      };
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity };
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
    const couponDiscount = state.hasCoupon
      ? +(pricing.totalPrice * COUPON_DISCOUNT_RATE).toFixed(2)
      : 0;
    const finalPrice = +(pricing.totalPrice - couponDiscount).toFixed(2);
    return {
      ...pricing,
      isDesignReady,
      canAddToCart: isDesignReady && state.quantity >= 10,
      couponDiscount,
      finalPrice,
    };
  }, [
    state.quantity,
    state.processingPhase,
    state.wizardStep,
    state.hasCoupon,
  ]);

  const value = useMemo(() => ({ state, derived, dispatch }), [state, derived]);

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}
