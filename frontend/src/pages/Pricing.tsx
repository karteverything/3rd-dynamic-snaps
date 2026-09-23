import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

import { useEffect, useState } from "react";
import { api, type PricingPackage } from "../lib/api";

const packages = [
  {
    number: "01",
    name: "Portrait",
    price: "R1,500",
    description:
      "A relaxed portrait session focused on natural expressions and authentic moments.",
    features: [
      "1 hour session",
      "1 location",
      "15 edited photographs",
      "Private online gallery",
    ],
  },
  {
    number: "02",
    name: "Event",
    price: "R3,500",
    description:
      "Photography coverage that captures the atmosphere, people and moments of your event.",
    features: [
      "Up to 4 hours",
      "Event coverage",
      "100+ edited photographs",
      "Private online gallery",
    ],
  },
  {
    number: "03",
    name: "Custom",
    price: "Let's talk",
    description:
      "For projects that require a more tailored approach, multiple locations or extended coverage.",
    features: [
      "Custom shoot duration",
      "Multiple locations",
      "Tailored deliverables",
      "Project consultation",
    ],
  },
];

export default function Pricing() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPricing() {
      try {
        const data = await api.getPricing();
        setPackages(data);
      } catch (error) {
        console.error("Failed to load pricing:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPricing();
  }, []);
  return (
    <PageLayout>
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-40 sm:pb-36 sm:pt-48 lg:pb-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-neutral-400">
              Pricing
            </p>

            <h1 className="page-title mt-7">
              Simple packages.
              <br />
              Meaningful images.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:flex lg:items-end">
            <p className="body-copy max-w-md">
              Every project is different. These packages
              provide a starting point, with custom options
              available for projects that need something
              different.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-neutral-100 px-6 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-neutral-300">
            {loading ? (
              <div className="py-12">
                <p className="text-sm text-neutral-400">
                  Loading pricing...
                </p>
              </div>
            ) : packages.length === 0 ? (
              <div className="py-12">
                <p className="text-sm text-neutral-400">
                  Pricing information coming soon.
                </p>
              </div>
            ) : (
              packages.map((pkg, index) => (
                <article
                  key={pkg.id}
                  className="grid gap-10 border-b border-neutral-300 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8"
                >
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="text-xs text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Package name */}
                  <div className="lg:col-span-4">
                    <h2 className="text-4xl font-light tracking-tight sm:text-5xl">
                      {pkg.name}
                    </h2>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-4">
                    <p className="eyebrow mb-5 text-neutral-400">
                      Includes
                    </p>

                    <ul className="space-y-3 text-sm text-neutral-600">
                      {pkg.features.map((feature, featureIndex) => (
                        <li
                          key={`${pkg.id}-${featureIndex}`}
                          className="flex gap-3"
                        >
                          <span className="text-neutral-400">
                            —
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="lg:col-span-3 lg:text-right">
                    <p className="text-3xl font-light tracking-tight sm:text-4xl">
                      {pkg.currency} {pkg.price ?? "—"}
                    </p>

                    <Link
                      to="/contact"
                      className="mt-7 inline-block border border-neutral-900 px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition duration-300 hover:bg-neutral-900 hover:text-white"
                    >
                      Enquire
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ / Note */}
      <section className="mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-neutral-400">
              Good to know
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-neutral-200">
              <div className="border-b border-neutral-200 py-8">
                <h3 className="text-xl font-light">
                  Need something custom?
                </h3>

                <p className="body-copy mt-4 max-w-xl">
                  If your project doesn't fit one of the
                  packages above, get in touch. We can discuss
                  the shoot, location, duration and deliverables
                  and put together something that works.
                </p>
              </div>

              <div className="border-b border-neutral-200 py-8">
                <h3 className="text-xl font-light">
                  How do I book?
                </h3>

                <p className="body-copy mt-4 max-w-xl">
                  Send an enquiry with some details about your
                  project. Once we've discussed the requirements
                  and availability, we'll confirm the booking.
                </p>
              </div>

              <div className="border-b border-neutral-200 py-8">
                <h3 className="text-xl font-light">
                  What happens after the shoot?
                </h3>

                <p className="body-copy mt-4 max-w-xl">
                  Your photographs are carefully selected and
                  edited before being delivered through a
                  private online gallery.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 transition-opacity hover:opacity-50"
            >
              Start an enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">
            Ready when you are
          </p>

          <h2 className="page-title mt-7 max-w-5xl">
            Let's make
            <br />
            something lasting.
          </h2>

          <Link
            to="/contact"
            className="mt-12 inline-block border border-white/40 px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}