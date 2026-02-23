"use client";

import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConfigurator } from "@/hooks/useConfigurator";
import { formatPrice } from "@/core/pricing";
import { trackPurchase } from "@/lib/meta-pixel";
import {
  SIZE_OPTIONS,
  FINISH_OPTIONS,
} from "@/components/pdp/Configurator/Configurator.constants";
import {
  COUNTRIES,
  US_STATES,
  CHECKOUT_STEPS,
  checkoutSchema,
  type CheckoutFormData,
} from "./CheckoutForm.constants";

/* ── Breadcrumb ───────────────────────────────────────── */
function Breadcrumb({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-7 flex-wrap">
      {CHECKOUT_STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <span
            className={`text-[13px] ${
              i === step
                ? "font-bold text-[#2A7A6F]"
                : i < step
                  ? "text-[#aaa] underline cursor-pointer"
                  : "text-[#ccc]"
            }`}
          >
            {s}
          </span>
          {i < CHECKOUT_STEPS.length - 1 && (
            <span className="text-[#ddd] text-xs">›</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Order Summary (collapsible on mobile) ────────────── */
function OrderSummary() {
  const [open, setOpen] = useState(false);
  const { state, derived } = useConfigurator();

  const sizeDiameter =
    SIZE_OPTIONS.find((o) => o.value === state.size)?.diameter ??
    `${state.size}"`;
  const finishLabel =
    FINISH_OPTIONS.find((o) => o.value === state.finish)?.label ?? state.finish;

  return (
    <div className="bg-white rounded-2xl border-[1.5px] border-[#e5e7eb] overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-transparent border-none cursor-pointer px-[18px] py-3.5 flex justify-between items-center font-[inherit]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#2A7A6F] font-bold">
            {open ? "Hide" : "Show"} order summary
          </span>
          <span className="text-xs text-[#aaa]">{open ? "▲" : "▼"}</span>
        </div>
        <span className="text-base font-black text-[#1e1e2e]">
          {formatPrice(derived.totalPrice)}
        </span>
      </button>

      {open && (
        <div className="border-t border-[#f0f0f0] px-[18px] py-3.5">
          <div className="flex gap-3.5 items-start mb-3.5">
            <div className="w-[52px] h-[52px] rounded-[10px] bg-[#edf5ea] flex items-center justify-center text-2xl shrink-0">
              📌
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">Custom Magnetic Pin</div>
              <div className="text-xs text-[#888] mt-0.5">
                {sizeDiameter} · {finishLabel} · {state.quantity} pcs
              </div>
            </div>
            <div className="font-extrabold text-[15px]">
              {formatPrice(derived.totalPrice)}
            </div>
          </div>

          {[
            ["Subtotal", formatPrice(derived.totalPrice)],
            ["Shipping", "FREE"],
            ["Total", formatPrice(derived.totalPrice)],
          ].map(([label, value], i) => (
            <div
              key={label}
              className="flex justify-between py-2 border-t border-[#f5f5f5]"
            >
              <span
                className={`text-[13px] ${i === 2 ? "text-[#1e1e2e] font-extrabold" : "text-[#777]"}`}
              >
                {label}
              </span>
              <span
                className={`text-[13px] ${
                  i === 2
                    ? "font-black text-[#2A7A6F]"
                    : i === 1
                      ? "font-semibold text-green-600"
                      : "font-semibold text-[#1e1e2e]"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Section heading ──────────────────────────────────── */
function SectionHeading({ number, label }: { number: string; label: string }) {
  return (
    <h2 className="text-[15px] font-extrabold text-[#1e1e2e] mb-3.5 flex items-center gap-2">
      <span className="w-[22px] h-[22px] bg-[#2A7A6F] rounded-full text-white inline-flex items-center justify-center text-[11px] font-extrabold">
        {number}
      </span>
      {label}
    </h2>
  );
}

/* ── Floating-label field ─────────────────────────────── */
function FloatingField({
  label,
  name,
  error,
  type = "text",
  autoComplete,
  inputMode,
  disabled,
  register,
  value,
}: {
  label: string;
  name: keyof CheckoutFormData;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel";
  disabled?: boolean;
  register: UseFormRegister<CheckoutFormData>;
  value?: string;
}) {
  const hasValue = !!value;
  return (
    <div className="relative mb-4">
      <input
        {...register(name)}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        disabled={disabled}
        className={`w-full border-[1.5px] rounded-xl text-[15px] text-[#1e1e2e] outline-none h-[52px] transition-[border-color] duration-150 font-[inherit] appearance-none ${
          error ? "border-red-500" : "border-[#e5e7eb] focus:border-[#2A7A6F]"
        } ${disabled ? "bg-[#f9f9f9]" : "bg-white"}`}
        style={{ padding: hasValue ? "20px 14px 8px" : "14px 14px 14px" }}
      />
      <label
        className={`absolute left-[14px] pointer-events-none transition-all duration-150 origin-left ${
          hasValue
            ? "top-1.5 scale-75 font-semibold text-[#2A7A6F]"
            : "top-4 text-[15px] text-[#aaa]"
        } ${error ? "!text-red-500" : ""}`}
      >
        {label}
      </label>
      {error ? (
        <div className="text-[11px] text-red-500 mt-1 pl-3.5">{error}</div>
      ) : null}
    </div>
  );
}

/* ── Floating-label select ────────────────────────────── */
function FloatingSelect({
  label,
  name,
  error,
  options,
  register,
  value,
}: {
  label: string;
  name: keyof CheckoutFormData;
  error?: string;
  options: readonly string[];
  register: UseFormRegister<CheckoutFormData>;
  value?: string;
}) {
  const hasValue = !!value;
  return (
    <div className="relative mb-4">
      <select
        {...register(name)}
        className={`w-full border-[1.5px] rounded-xl text-[15px] text-[#1e1e2e] outline-none h-[52px] transition-[border-color] duration-150 font-[inherit] cursor-pointer appearance-none bg-white ${
          error ? "border-red-500" : "border-[#e5e7eb] focus:border-[#2A7A6F]"
        }`}
        style={{
          padding: hasValue ? "20px 14px 8px" : "14px 14px 14px",
          color: hasValue ? "#1e1e2e" : "transparent",
        }}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-[14px] pointer-events-none transition-all duration-150 origin-left ${
          hasValue
            ? "top-1.5 scale-75 font-semibold text-[#2A7A6F]"
            : "top-4 text-[15px] text-[#aaa]"
        } ${error ? "!text-red-500" : ""}`}
      >
        {label}
      </label>
      {error ? (
        <div className="text-[11px] text-red-500 mt-1 pl-3.5">{error}</div>
      ) : null}
    </div>
  );
}

/* ── Disabled panel shell ─────────────────────────────── */
function DisabledPanel({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#e5e7eb] bg-[#fafafa] mb-4 overflow-hidden opacity-60 pointer-events-none select-none">
      <div className="px-6 py-[18px] flex items-center gap-2.5">
        <span className="w-[22px] h-[22px] bg-[#ccc] rounded-full text-white inline-flex items-center justify-center text-[11px] font-extrabold shrink-0">
          {number}
        </span>
        <span className="text-[15px] font-extrabold text-[#bbb]">{title}</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-[#bbb] font-semibold bg-[#f0f0f0] px-2.5 py-1 rounded-full">
          🔒 Complete previous step
        </span>
      </div>
      <div className="px-6 pb-5">{children}</div>
    </div>
  );
}

/* ── Payment panel (disabled) ─────────────────────────── */
function PaymentPanel() {
  return (
    <DisabledPanel number="4" title="Payment">
      <div className="mb-3.5">
        <div className="flex gap-2 mb-3">
          {["💳 Visa", "💳 MC", "💳 Amex", "💳 PayPal"].map((c) => (
            <div
              key={c}
              className="text-[11px] px-2.5 py-1 border border-[#e5e7eb] rounded-lg text-[#bbb] bg-white"
            >
              {c}
            </div>
          ))}
        </div>
        <div className="relative mb-4">
          <input
            disabled
            className="w-full border-[1.5px] border-[#e5e7eb] rounded-xl h-[52px] bg-[#f9f9f9] px-3.5"
            placeholder="Name on card"
          />
        </div>
        <div className="relative mb-4">
          <input
            disabled
            className="w-full border-[1.5px] border-[#e5e7eb] rounded-xl h-[52px] bg-[#f9f9f9] px-3.5"
            placeholder="Card number"
          />
        </div>
        <div className="grid grid-cols-[1fr_100px] gap-3">
          <input
            disabled
            className="w-full border-[1.5px] border-[#e5e7eb] rounded-xl h-[52px] bg-[#f9f9f9] px-3.5"
            placeholder="MM / YY"
          />
          <input
            disabled
            className="w-full border-[1.5px] border-[#e5e7eb] rounded-xl h-[52px] bg-[#f9f9f9] px-3.5"
            placeholder="CVV"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#f5f5f5] rounded-[10px]">
        <div className="w-4 h-4 rounded border-[1.5px] border-[#ccc] bg-[#e0e0e0]" />
        <span className="text-[13px] text-[#ccc]">
          Same as shipping address
        </span>
      </div>
    </DisabledPanel>
  );
}

/* ── Review panel (disabled) ──────────────────────────── */
function ReviewPanel() {
  const { state, derived } = useConfigurator();
  const sizeDiameter =
    SIZE_OPTIONS.find((o) => o.value === state.size)?.diameter ??
    `${state.size}"`;
  const finishLabel =
    FINISH_OPTIONS.find((o) => o.value === state.finish)?.label ?? state.finish;

  const rows = [
    ["Contact", "—"],
    ["Ship to", "—"],
    ["Method", "Standard · FREE"],
    ["Payment", "—"],
  ];

  return (
    <DisabledPanel number="5" title="Review & Place Order">
      <div className="bg-white rounded-xl px-3.5 py-1 mb-3.5">
        {rows.map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between items-start py-2.5 border-b border-[#f0f0f0] last:border-b-0 text-[13px]"
          >
            <span className="text-[#bbb] font-semibold min-w-[80px]">
              {label}
            </span>
            <span className="text-[#ccc]">{val}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 items-start bg-[#edf5ea] rounded-[10px] px-3.5 py-3 mb-4 opacity-50">
        <span className="text-base">📌</span>
        <div>
          <div className="text-[13px] font-bold text-[#1e1e2e]">
            Custom Magnetic Pin
          </div>
          <div className="text-xs text-[#888]">
            {sizeDiameter} · {finishLabel} · {state.quantity} pcs ·{" "}
            {formatPrice(derived.totalPrice)}
          </div>
        </div>
      </div>

      <button
        disabled
        className="w-full py-4 bg-[#f0bf60] text-[#1e1e2e] border-none rounded-[14px] text-base font-extrabold opacity-30 cursor-not-allowed font-[inherit]"
      >
        Place Order — {formatPrice(derived.totalPrice)}
      </button>
    </DisabledPanel>
  );
}

/* ── "We're Not There Yet" modal ──────────────────────── */
function SorryModal({
  firstName,
  email,
  onClose,
}: {
  firstName: string;
  email: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-[4px] z-[1000] flex items-center justify-center p-5">
      <div className="animate-fade-up bg-white rounded-3xl py-10 px-8 max-w-[400px] w-full text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
        <div className="w-[72px] h-[72px] rounded-full bg-[#fff8ec] border-[3px] border-[#f0bf60] flex items-center justify-center text-[32px] mx-auto mb-5">
          🌍
        </div>

        <h2 className="text-xl font-black text-[#1e1e2e] mb-2.5">
          We&apos;re Not There Yet
        </h2>
        <p className="text-sm text-[#777] leading-relaxed mb-1.5">
          Sorry, <strong className="text-[#1e1e2e]">{firstName}</strong> — we
          don&apos;t ship to your location just yet, but we&apos;re working on
          it!
        </p>
        <p className="text-sm text-[#777] leading-relaxed mb-7">
          We&apos;ve saved your details and will reach out to{" "}
          <strong className="text-[#1e1e2e]">{email}</strong> the moment we
          start delivering to your area.
        </p>

        <div className="h-px bg-[#f0f0f0] mb-6" />

        <div className="text-left mb-7">
          {[
            ["📬", "We'll email you as soon as shipping opens to your region"],
            ["🎁", "You'll get early access and an exclusive discount"],
            ["💬", "Feel free to reach us at hello@magpinstudio.com"],
          ].map(([icon, text]) => (
            <div
              key={text}
              className="flex gap-2.5 items-start mb-2.5 text-[13px] text-[#555]"
            >
              <span className="shrink-0">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-[#f0bf60] text-[#1e1e2e] border-none rounded-[14px] text-[15px] font-extrabold cursor-pointer font-[inherit] shadow-[0_4px_14px_rgba(240,191,96,0.35)] hover:opacity-90 transition-opacity"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
}

/* ── Main CheckoutForm ────────────────────────────────── */
export function CheckoutForm() {
  const [showModal, setShowModal] = useState(false);
  const { state, derived } = useConfigurator();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      country: "",
      city: "",
      state: "",
      zip: "",
    },
    mode: "onBlur",
  });

  const watchAll = watch();
  const isUS = watchAll.country === "United States";

  const onSubmit = async (_data: CheckoutFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    trackPurchase({
      contentIds: ["custom-magnetic-pin"],
      contentType: "product",
      value: derived.totalPrice,
      currency: "USD",
      numItems: state.quantity,
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-[520px] mx-auto px-5 py-7">
      <Breadcrumb step={0} />
      <OrderSummary />

      {showModal && (
        <SorryModal
          firstName={watchAll.firstName ?? ""}
          email={watchAll.email ?? ""}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── Shipping (active panel) ── */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate-fade-up bg-white rounded-[18px] p-6 border-[1.5px] border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.05)] mb-4"
      >
        {/* Contact */}
        <div className="mb-6">
          <SectionHeading number="1" label="Contact" />
          <FloatingField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            register={register}
            value={watchAll.email}
            error={errors.email?.message}
          />
        </div>

        <div className="h-px bg-[#f0f0f0] mb-6" />

        {/* Shipping address */}
        <div className="mb-6">
          <SectionHeading number="2" label="Shipping Address" />
          <div className="grid grid-cols-2 gap-3">
            <FloatingField
              label="First name"
              name="firstName"
              autoComplete="given-name"
              register={register}
              value={watchAll.firstName}
              error={errors.firstName?.message}
            />
            <FloatingField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              register={register}
              value={watchAll.lastName}
              error={errors.lastName?.message}
            />
          </div>
          <FloatingField
            label="Address"
            name="address1"
            autoComplete="address-line1"
            register={register}
            value={watchAll.address1}
            error={errors.address1?.message}
          />
          <FloatingField
            label="Apartment, suite, etc. (optional)"
            name="address2"
            autoComplete="address-line2"
            register={register}
            value={watchAll.address2}
          />
          <FloatingSelect
            label="Country"
            name="country"
            options={COUNTRIES}
            register={register}
            value={watchAll.country}
            error={errors.country?.message}
          />
          <FloatingField
            label="City"
            name="city"
            autoComplete="address-level2"
            register={register}
            value={watchAll.city}
            error={errors.city?.message}
          />
          <div className="grid grid-cols-2 gap-3">
            {isUS ? (
              <FloatingSelect
                label="State"
                name="state"
                options={US_STATES}
                register={register}
                value={watchAll.state}
                error={errors.state?.message}
              />
            ) : (
              <FloatingField
                label="Region / State"
                name="state"
                autoComplete="address-level1"
                register={register}
                value={watchAll.state}
                error={errors.state?.message}
              />
            )}
            <FloatingField
              label="ZIP / Postal code"
              name="zip"
              autoComplete="postal-code"
              inputMode="numeric"
              register={register}
              value={watchAll.zip}
              error={errors.zip?.message}
            />
          </div>
        </div>

        <div className="h-px bg-[#f0f0f0] mb-6" />

        {/* Shipping method */}
        <div className="mb-6">
          <SectionHeading number="3" label="Shipping Method" />
          <div className="border-2 border-[#2A7A6F] rounded-xl px-4 py-3.5 bg-[#edf5ea] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-[#2A7A6F] bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#2A7A6F]" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#1e1e2e]">
                  Standard Shipping
                </div>
                <div className="text-[11px] text-[#888] mt-px">
                  10–14 business days after proof approval
                </div>
              </div>
            </div>
            <span className="text-[13px] font-extrabold text-green-600">
              FREE
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#f0bf60] text-[#1e1e2e] border-none rounded-[14px] text-base font-extrabold cursor-pointer shadow-[0_4px_16px_rgba(240,191,96,0.4)] transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0 font-[inherit]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/20 border-t-[#1e1e2e] rounded-full animate-spin inline-block" />
              Processing…
            </span>
          ) : (
            "Continue to Payment →"
          )}
        </button>

        <div className="flex justify-center gap-5 mt-4 flex-wrap">
          {["🔒 SSL Encrypted", "📋 No spam, ever", "🚚 Free shipping"].map(
            (t) => (
              <span key={t} className="text-[11px] text-[#aaa] font-medium">
                {t}
              </span>
            ),
          )}
        </div>
      </form>

      {/* ── Payment (disabled) ── */}
      <PaymentPanel />

      {/* ── Review (disabled) ── */}
      <ReviewPanel />
    </div>
  );
}
