import { useEffect, useState } from "react";
import { api, type PricingPackage } from "../../lib/api";

import AdminNav from "../../components/AdminNav";

export default function AdminPricing() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
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

  function updatePackage(
    id: string,
    field: keyof PricingPackage,
    value: unknown,
  ) {
    setPackages((current) =>
      current.map((pkg) =>
        pkg.id === id
          ? { ...pkg, [field]: value }
          : pkg,
      ),
    );
  }

  function updateFeature(
    packageId: string,
    featureIndex: number,
    value: string,
  ) {
    setPackages((current) =>
      current.map((pkg) => {
        if (pkg.id !== packageId) {
          return pkg;
        }

        const features = [...pkg.features];
        features[featureIndex] = value;

        return {
          ...pkg,
          features,
        };
      }),
    );
  }

  async function savePackage(pkg: PricingPackage) {
    setSavingId(pkg.id);
    setMessage("");

    try {
      await api.updatePricing(pkg.id, {
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        currency: pkg.currency,
        features: pkg.features,
        is_published: pkg.is_published,
      });

      setMessage(`${pkg.name} saved successfully.`);
      await loadPricing();
    } catch (error) {
      console.error(error);
      setMessage(`Failed to save ${pkg.name}.`);
    } finally {
      setSavingId(null);
    }
  }

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
      <AdminNav />
      
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

        <div className="mt-10 space-y-8">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="bg-white p-6 sm:p-8"
            >
              <div>
                <label className="eyebrow text-neutral-400">
                  Package name
                </label>

                <input
                  value={pkg.name}
                  onChange={(event) =>
                    updatePackage(
                      pkg.id,
                      "name",
                      event.target.value,
                    )
                  }
                  className="mt-3 w-full border-b border-neutral-300 bg-transparent py-2 text-xl font-light outline-none focus:border-neutral-900"
                />
              </div>

              <div className="mt-8">
                <label className="eyebrow text-neutral-400">
                  Description
                </label>

                <textarea
                  value={pkg.description}
                  onChange={(event) =>
                    updatePackage(
                      pkg.id,
                      "description",
                      event.target.value,
                    )
                  }
                  rows={3}
                  className="mt-3 w-full resize-none border-b border-neutral-300 bg-transparent py-2 text-sm leading-7 outline-none focus:border-neutral-900"
                />
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="eyebrow text-neutral-400">
                    Price
                  </label>

                  <input
                    type="number"
                    value={pkg.price ?? ""}
                    onChange={(event) =>
                      updatePackage(
                        pkg.id,
                        "price",
                        event.target.value
                          ? Number(event.target.value)
                          : null,
                      )
                    }
                    className="mt-3 w-full border-b border-neutral-300 bg-transparent py-2 text-sm outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="eyebrow text-neutral-400">
                    Currency
                  </label>

                  <input
                    value={pkg.currency}
                    onChange={(event) =>
                      updatePackage(
                        pkg.id,
                        "currency",
                        event.target.value,
                      )
                    }
                    className="mt-3 w-full border-b border-neutral-300 bg-transparent py-2 text-sm outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="eyebrow text-neutral-400">
                  Features
                </label>

                <div className="mt-4 space-y-3">
                  {pkg.features.map(
                    (feature, index) => (
                      <input
                        key={index}
                        value={feature}
                        onChange={(event) =>
                          updateFeature(
                            pkg.id,
                            index,
                            event.target.value,
                          )
                        }
                        className="w-full border-b border-neutral-300 bg-transparent py-2 text-sm outline-none focus:border-neutral-900"
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-6 border-t border-neutral-200 pt-6">
                <label className="flex items-center gap-3 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={pkg.is_published}
                    onChange={(event) =>
                      updatePackage(
                        pkg.id,
                        "is_published",
                        event.target.checked,
                      )
                    }
                  />

                  Published
                </label>

                <button
                  type="button"
                  onClick={() => savePackage(pkg)}
                  disabled={savingId === pkg.id}
                  className="bg-black px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-50"
                >
                  {savingId === pkg.id
                    ? "Saving..."
                    : "Save changes"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}