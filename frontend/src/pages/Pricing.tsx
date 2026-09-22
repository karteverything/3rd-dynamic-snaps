import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const packages = [
  {
    number: "01",
    name: "Portrait",
    price: "R1,500",
    description: "A relaxed portrait session.",
    features: [
      "1 hour session",
      "1 location",
      "15 edited photographs",
    ],
  },
  {
    number: "02",
    name: "Event",
    price: "R3,500",
    description: "Photography coverage for your event.",
    features: [
      "Up to 4 hours",
      "Event coverage",
      "100+ edited photographs",
    ],
  },
  {
    number: "03",
    name: "Custom",
    price: "Let's talk",
    description: "For projects that need something different.",
    features: [
      "Custom shoot duration",
      "Multiple locations",
      "Tailored deliverables",
    ],
  },
];

export default function Pricing() {
  return (
    <PageLayout>
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-40">
        <div className="max-w-4xl">
          <p className="eyebrow text-neutral-400">
            Pricing
          </p>

          <h1 className="page-title mt-7">
            Simple packages.
            <br />
            Meaningful images.
          </h1>

          <p className="body-copy mt-10 max-w-xl">
            Every project is different. These packages provide
            a starting point, and custom requirements can be
            discussed.
          </p>
        </div>

        <div className="mt-24 border-t border-neutral-200">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="grid gap-8 border-b border-neutral-200 py-12 md:grid-cols-[80px_1fr_1fr_auto] md:items-start"
            >
              <span className="text-xs text-neutral-400">
                {pkg.number}
              </span>

              <div>
                <h2 className="text-3xl font-light">
                  {pkg.name}
                </h2>

                <p className="mt-3 text-sm text-neutral-500">
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-neutral-600">
                {pkg.features.map((feature) => (
                  <li key={feature}>— {feature}</li>
                ))}
              </ul>

              <div className="md:text-right">
                <p className="text-2xl font-light">
                  {pkg.price}
                </p>

                <Link
                  to="/contact"
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-8"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}