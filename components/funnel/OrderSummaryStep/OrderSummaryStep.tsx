"use client";

import { useRouter } from "next/navigation";
import { useConfigurator } from "@/hooks/useConfigurator";
import { trackAddToCart } from "@/lib/meta-pixel";
import { clarityAddToCart } from "@/lib/clarity";
import { sendAddToCartWebhook } from "@/lib/webhook-add-to-cart";
import { getTier } from "@/components/funnel/FunnelFlow/FunnelFlow.constants";
import type { PinStyleOption } from "@/components/funnel/FunnelFlow/FunnelFlow.types";
import { FunnelNav } from "@/components/funnel/FunnelNav/FunnelNav";

interface OrderSummaryStepProps {
  qty: number;
  style: PinStyleOption;
  file: File | null;
  previewUrl: string | null;
  generatedImages: string[][];
  onBack: () => void;
}

export function OrderSummaryStep({
  qty,
  style,
  file,
  previewUrl,
  generatedImages,
  onBack,
}: OrderSummaryStepProps) {
  const router = useRouter();
  const { dispatch } = useConfigurator();
  const tier = getTier(qty);
  const total = (qty * tier.price).toFixed(2);

  const rows = [
    { label: "Design", value: style.label, bold: true },
    { label: "Quantity", value: `${qty} pieces`, bold: true },
    { label: "Price per pin", value: `$${tier.price.toFixed(2)}`, green: true },
    { label: "Delivery", value: "25 business days", bold: true },
    { label: "Shipping", value: "FREE", green: true },
  ];

  const handleAddToCart = () => {
    if (file && previewUrl) {
      dispatch({ type: "SET_FILE", file, previewUrl });
    }
    if (generatedImages.length > 0) {
      dispatch({ type: "SET_GENERATED_IMAGES", images: generatedImages });
    }
    dispatch({ type: "SET_SELECTED_IMAGE", index: 0 });
    dispatch({ type: "SET_QUANTITY", quantity: qty });
    dispatch({ type: "WIZARD_CONFIRM_STYLE" });

    trackAddToCart({
      contentName: "Custom Magnetic Pin",
      contentIds: ["funnel-custom-pin"],
      contentType: "product",
      value: qty * tier.price,
      currency: "USD",
      quantity: qty,
    });
    clarityAddToCart();

    sendAddToCartWebhook({
      quantity: qty,
      size: "Standard",
      finish: style.label,
      unitPrice: tier.price,
      totalPrice: qty * tier.price,
      finalPrice: qty * tier.price,
      couponDiscount: 0,
      hasCoupon: false,
      email: null,
    });

    router.push("/checkout");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] font-sans">
      <FunnelNav step={4} total={4} label="Order Summary" onBack={onBack} />

      <div className="mx-auto box-border flex w-full max-w-[480px] flex-1 flex-col gap-4 px-5 pb-8 pt-6">
        <h1 className="text-[22px] font-extrabold tracking-[-0.4px] text-[#1a1a1a]">
          Review your order
        </h1>

        {/* Summary card */}
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          {/* Teal gradient header */}
          <div
            className="px-5 py-4"
            style={{
              background: "linear-gradient(135deg, #1e5c54, #2a7a6f)",
            }}
          >
            <p className="text-[17px] font-extrabold text-white">
              Order Summary
            </p>
          </div>

          {/* Row items */}
          <div className="py-1">
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-[13px]"
                style={{
                  borderBottom:
                    i < rows.length - 1 ? "1px solid #f2f2f2" : "none",
                }}
              >
                <span className="text-sm text-[#888]">{row.label}</span>
                <span
                  className="text-sm"
                  style={{
                    fontWeight: row.bold || row.green ? 700 : 400,
                    color: row.green ? "#2a7a6f" : "#1a1a1a",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t-2 border-[#f0f0f0] px-5 py-4">
            <span className="text-base font-extrabold text-[#2a7a6f]">
              Total
            </span>
            <span className="text-2xl font-black text-[#2a7a6f]">${total}</span>
          </div>

          {/* Delivery info */}
          <div className="mx-4 mb-4 flex items-center gap-2.5 rounded-xl bg-[#f0faf8] p-3 px-3.5">
            <span className="text-[22px]">🚚</span>
            <span className="text-[13px] leading-[1.4] text-[#555]">
              Delivery in <strong>25 business days</strong> after proof approval
            </span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto w-full rounded-full bg-[#f5c842] py-[18px] text-[17px] font-extrabold text-[#1a1a1a] shadow-[0_4px_16px_rgba(245,200,66,0.4)]"
        >
          Add to Cart
        </button>
        <p className="text-center text-xs text-[#bbb]">
          Free design proof before production
        </p>
      </div>
    </div>
  );
}
