import { InfoPage } from "@/components/shared/InfoPage/InfoPage";

export default function TermsPage() {
  return (
    <InfoPage title="Terms & Conditions" subtitle="The Fine Print">
      <div className="space-y-6">
        <p>
          Welcome to LovePinz! By using our website and placing an order, you
          agree to the following terms and conditions.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Custom Orders
        </h3>
        <p>
          When you place an order with LovePinz, you represent that you own the
          rights to the artwork provided or have permission to use it for custom
          manufacturing. LovePinz is not responsible for any copyright or
          trademark infringements.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Design Proofs
        </h3>
        <p>
          We provide a digital proof for every order. It is your responsibility
          to review the proof for spelling, color, and design accuracy. Once a
          proof is approved, LovePinz is not responsible for any errors that
          were present in the approved design.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Production Times
        </h3>
        <p>
          Our estimated production times are 10–14 business days after proof
          approval. These are estimates and not guarantees. We work hard to meet
          these timelines, but production may occasionally take longer due to
          seasonal demand or other factors.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Privacy Policy
        </h3>
        <p>
          Your privacy is important to us. We use the information you provide
          only to fulfill your order and communicate with you about your
          purchase. We do not sell or share your personal information with third
          parties except as necessary for payment processing and shipping.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Governing Law
        </h3>
        <p>
          These terms and conditions are governed by the laws of the State where
          LovePinz is located, without regard to its conflict of law principles.
        </p>
      </div>
    </InfoPage>
  );
}
