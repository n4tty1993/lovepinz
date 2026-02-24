import { InfoPage } from "@/components/shared/InfoPage/InfoPage";

export default function ShippingPolicyPage() {
  return (
    <InfoPage title="Shipping Policy" subtitle="Delivery & Tracking">
      <div className="space-y-6">
        <p>
          We know you&apos;re excited to see your custom designs come to life!
          Our shipping process is designed to be as clear and efficient as
          possible.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Production Timeline
        </h3>
        <p>
          Delivery takes approximately <strong>25 business days</strong> after
          your digital proof is approved.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Step 1:</strong> Digital proof sent via email (within 1-2
            business days).
          </li>
          <li>
            <strong>Step 2:</strong> You approve the proof.
          </li>
          <li>
            <strong>Step 3:</strong> Production & delivery (25 business days).
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Domestic Shipping (USA)
        </h3>
        <p>
          We offer <strong>Free Shipping</strong> across the entire USA for all
          orders.
        </p>
        <p>Shipping times within the USA are typically:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>USPS / UPS Ground:</strong> 3-5 business days.
          </li>
          <li>
            <strong>Expedited Shipping:</strong> If you have a deadline, please
            contact us for expedited shipping quotes.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          International Shipping
        </h3>
        <p>
          At this time, we primarily focus on serving our customers within the
          United States. If you are outside the USA and interested in ordering,
          please email us for a custom shipping quote.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Order Tracking
        </h3>
        <p>
          Once your order has shipped, you will receive an email with a tracking
          number so you can follow its progress all the way to your door.
        </p>
      </div>
    </InfoPage>
  );
}
