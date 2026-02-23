import { InfoPage } from "@/components/shared/InfoPage/InfoPage";

export default function RefundPolicyPage() {
  return (
    <InfoPage title="Refund Policy" subtitle="Returns & Cancellations">
      <div className="space-y-6">
        <p>
          At LovePinz, we take pride in the quality of our custom magnetic pins.
          Because our products are custom-made to order, we have a specific
          refund and return policy.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Cancellations
        </h3>
        <p>
          If you need to cancel your order, please contact us immediately.
          Orders can be cancelled for a full refund at any time{" "}
          <strong>before you approve your digital proof</strong>.
        </p>
        <p>
          Once a digital proof is approved and the order is sent to production,
          we cannot cancel or refund your order as materials and labor have
          already been committed to your custom project.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Returns & Defects
        </h3>
        <p>
          Since our pins are custom-manufactured based on your unique design, we
          cannot accept returns for reasons other than manufacturing defects or
          errors on our part.
        </p>
        <p>
          If your order arrives damaged, defective, or does not match your
          approved digital proof, please contact us within 14 days of receiving
          your order with photos of the issue.
        </p>
        <p>We will either:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>Remake and reship the affected pins at no cost to you.</li>
          <li>
            Offer a partial or full refund depending on the extent of the
            defect.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Shipping Errors
        </h3>
        <p>
          If your package is lost in transit or shows as delivered but you
          haven&apos;t received it, please contact us within 14 days so we can
          work with the carrier to resolve the issue.
        </p>
      </div>
    </InfoPage>
  );
}
