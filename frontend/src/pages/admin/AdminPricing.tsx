import { useEffect, useState } from "react";
import { api, type PricingPackage } from "../../lib/api";

export default function AdminPricing() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadPricing() {
    setLoading(true);

    try {
      const data = await api.getPricing();
      setPackages(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load pricing.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPricing();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-500">
          Loading pricing...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="border-b border-neutral-300 pb-8">
          <p className="eyebrow text-neutral-400">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight">
            Pricing
          </h1>
        </div>

        {message && (
          <p className="border-b border-neutral-300 py-5 text-sm text-neutral-600">
            {message}
          </p>
        )}

        {packages.length === 0 ? (
          <div className="py-20">
            <p className="text-sm text-neutral-500">
              No pricing packages yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-white p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-light">
                      {pkg.name}
                    </h2>

                    <p className="mt-2 text-sm text-neutral-500">
                      {pkg.description}
                    </p>
                  </div>

                  <p className="text-lg">
                    {pkg.currency} {pkg.price ?? "—"}
                  </p>
                </div>

                {pkg.features.length > 0 && (
                  <ul className="mt-6 space-y-2 text-sm text-neutral-500">
                    {pkg.features.map((feature, index) => (
                      <li key={index}>
                        — {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {pkg.is_published
                    ? "Published"
                    : "Unpublished"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}