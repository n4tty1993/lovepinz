import { InfoPage } from "@/components/shared/InfoPage/InfoPage";

export default function ContactPage() {
  return (
    <InfoPage title="Contact Us" subtitle="Get in Touch">
      <div className="space-y-6">
        <p>
          Have a question about your order? Need help with your artwork? Our
          team is here to help you create the perfect magnetic pins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl border border-[#2A7A6F]/10 shadow-sm">
            <h3 className="text-xl font-bold text-[#2C1A0E] mb-4">Email Us</h3>
            <p className="text-[#7A6458]">
              The best way to reach us for order inquiries and artwork
              questions.
            </p>
            <p className="text-[#1F5C53] font-bold mt-4 text-lg">
              team@lovepinz.com
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#2A7A6F]/10 shadow-sm">
            <h3 className="text-xl font-bold text-[#2C1A0E] mb-4">
              Business Hours
            </h3>
            <p className="text-[#7A6458]">
              Monday — Friday
              <br />
              9:00 AM — 5:00 PM EST
            </p>
            <p className="text-[#7A6458] mt-4 text-sm italic">
              We typically respond within 24 business hours.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-[#EDF5EA] rounded-2xl border border-[#2A7A6F]/10">
          <h3 className="text-xl font-bold text-[#2C1A0E] mb-4">
            Common Questions
          </h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Where is my order?</strong> Check your email for shipping
              notifications or reach out with your order number.
            </li>
            <li>
              <strong>Can I change my artwork?</strong> If you haven&apos;t
              approved your digital proof yet, yes! Send us the new file via
              email.
            </li>
            <li>
              <strong>Do you offer bulk discounts?</strong> Yes! Check our
              product page for tiered pricing or email us for orders over 1,000
              pieces.
            </li>
          </ul>
        </div>
      </div>
    </InfoPage>
  );
}
