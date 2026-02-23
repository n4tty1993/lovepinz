import { InfoPage } from "@/components/shared/InfoPage/InfoPage";

export default function AboutPage() {
  return (
    <InfoPage title="About LovePinz" subtitle="Our Story">
      <div className="space-y-6">
        <p>
          LovePinz was born out of a simple problem: we loved custom enamel
          pins, but we hated the holes they left in our favorite clothes.
          Blazers, silk shirts, and delicate knits were off-limits for
          traditional pin collectors—until now.
        </p>
        <p>
          We set out to create the easiest way to design and order high-quality,
          magnetic enamel pins that stay secure without a single needle
          puncture.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">Our Mission</h3>
        <p>
          Our mission is to empower brands, creators, and individuals to share
          their message through premium custom pins that are as versatile as
          they are beautiful. By using dual-strength magnetic backings, we
          ensure your designs look great on any fabric, from the thinnest silk
          to the thickest denim.
        </p>

        <h3 className="text-2xl font-bold text-[#2C1A0E] mt-8">
          Why Choose Us?
        </h3>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>No Holes:</strong> Our proprietary magnetic system means
            zero damage to your clothing.
          </li>
          <li>
            <strong>Low Minimums:</strong> Start your collection with as few as
            25 pieces.
          </li>
          <li>
            <strong>Premium Quality:</strong> We use iron and zinc alloys with
            premium plating for a retail-ready finish.
          </li>
          <li>
            <strong>Free Digital Proofs:</strong> We never go into production
            until you are 100% happy with your design.
          </li>
        </ul>

        <p className="mt-8">
          Based in the USA, our team is dedicated to providing a seamless,
          conversion-focused experience for all our customers. Whether
          you&apos;re a small business owner looking for unique branding or an
          artist launching a new collection, we&apos;re here to help you make it
          happen.
        </p>
      </div>
    </InfoPage>
  );
}
