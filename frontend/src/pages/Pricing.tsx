import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const packages = [
  {
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
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Pricing
          </p>

          <h1 className="mt-6 text-5xl font-light tracking-tight sm:text-7xl">
            Simple packages.
            <br />
            Meaningful images.
          </h1>

          <p className="mt-8 leading-8 text-neutral-600">
            Choose a package below or get in touch if you have
            something specific in mind.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="border border-neutral-200 p-8"
            >
              <h2 className="text-2xl font-light">
                {pkg.name}
              </h2>

              <p className="mt-4 text-3xl font-light">
                {pkg.price}
              </p>

              <p className="mt-6 text-neutral-600">
                {pkg.description}
              </p>

              <ul className="mt-8 space-y-3 text-sm text-neutral-600">
                {pkg.features.map((feature) => (
                  <li key={feature}>— {feature}</li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-10 inline-block border border-black px-6 py-3 text-sm uppercase tracking-widest transition hover:bg-black hover:text-white"
              >
                Enquire
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}