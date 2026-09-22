import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import SafeImage from "../components/SafeImage";

import { api, type Photo } from "../lib/api";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await api.getPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Unable to load photos:", error);
      } finally {
        setLoadingPhotos(false);
      }
    }

    loadPhotos();
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-neutral-950">
        <img
          src="/hero.jpg"
          alt="Featured photography"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:pb-20">
          <div className="max-w-6xl">
            <p className="eyebrow text-white/60">
              3rd Dynamic Snaps
            </p>

            <h1 className="page-title mt-7 text-white">
              Moments worth
              <br />
              remembering.
            </h1>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/65">
                Authentic photography capturing people,
                places and moments with intention.
              </p>

              <Link
                to="/contact"
                className="w-fit border border-white/50 px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-white hover:text-black"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-neutral-400">
              01 — Philosophy
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2 className="section-title max-w-5xl">
              Photography that feels natural,
              honest and timeless.
            </h2>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <p className="body-copy max-w-xl">
                The best photographs don't feel forced.
                They're moments that happen naturally,
                captured with intention and care.
              </p>

              <Link
                to="/about"
                className="w-fit shrink-0 text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 transition-opacity hover:opacity-50"
              >
                About the photographer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-neutral-100 px-6 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-neutral-400">
                02 — Selected work
              </p>

              <h2 className="section-title mt-6">
                Recent work.
              </h2>
            </div>

            <Link
              to="/contact"
              className="w-fit text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 transition-opacity hover:opacity-50"
            >
              Book a shoot
            </Link>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {loadingPhotos ? (
              <>
                <div className="h-[520px] animate-pulse bg-neutral-200 sm:h-[650px]" />

                <div className="h-[300px] animate-pulse bg-neutral-200 sm:h-[360px]" />

                <div className="h-[300px] animate-pulse bg-neutral-200 sm:h-[360px]" />
              </>
            ) : photos.length === 0 ? (
              <div className="col-span-full border border-dashed border-neutral-300 py-20 text-center">
                <p className="eyebrow text-neutral-400">
                  No published photographs
                </p>
              </div>
            ) : (
              photos.slice(0, 3).map((photo, index) => (
                <div
                  key={photo.id}
                  className={`image-hover ${
                    index === 0 ? "md:row-span-2" : ""
                  }`}
                >
                  <SafeImage
                    src={photo.url}
                    alt={photo.alt_text || photo.filename}
                    className={
                      index === 0
                        ? "h-[520px] w-full sm:h-[650px]"
                        : "h-[300px] w-full sm:h-[360px]"
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-white px-6 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-neutral-400">
            03 — The experience
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <h2 className="section-title lg:col-span-8">
              Less posing.
              <br />
              More living.
            </h2>

            <p className="body-copy max-w-md lg:col-span-4 lg:pt-3">
              Whether it's a portrait, celebration or
              creative project, the aim is to create images
              that feel like you—not a performance for the
              camera.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">
            04 — Let's work together
          </p>

          <h2 className="page-title mt-7 max-w-6xl">
            Have a story
            <br />
            worth capturing?
          </h2>

          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/50">
              Tell me about your project and let's create
              something meaningful together.
            </p>

            <Link
              to="/contact"
              className="w-fit border border-white/40 px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}