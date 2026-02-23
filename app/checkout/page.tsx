import { CheckoutForm } from "@/components/checkout/CheckoutForm/CheckoutForm";
import { CheckoutPixelEvents } from "@/components/checkout/CheckoutPixelEvents";

export default function CheckoutPage() {
  return (
    <main className="bg-[#f7f7fb] min-h-screen pt-16 pb-10">
      <CheckoutPixelEvents />
      <CheckoutForm />
    </main>
  );
}
