import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const photos = [
  {
    src: "/images/photo-1.jpg",
    alt: "Photography work",
  },
  {
    src: "/images/photo-2.jpg",
    alt: "Photography work",
  },
  {
    src: "/images/photo-3.jpg",
    alt: "Photography work",
  },
];

export default function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-neutral-900">
        <img
          src="/images/hero.jpg"
          alt="Featured photography"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">
            Photography
          </p>

          <h1 className="max-w-4xl text-5xl font-light tracking-tight sm:text-7xl">
            Moments worth
            <br />
            remembering.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            Authentic photography capturing people,
            places and moments with intention.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-block border border-white px-6 py-3 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            01 — About the work
          </p>

          <h2 className="mt-6 text-4xl font-light tracking-tight sm:text-5xl">
            Photography that feels natural, honest and timeless.
          </h2>

          <p className="mt-8 leading-8 text-neutral-600">
            Every photograph tells a story. My approach is simple:
            create images that feel genuine and preserve the
            moments that matter.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-block text-sm uppercase tracking-widest underline underline-offset-8"
          >
            More about me
          </Link>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-neutral-100 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            02 — Selected work
          </p>

          <h2 className="mt-4 text-4xl font-light tracking-tight">
            Recent photographs
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {photos.map((photo, index) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover ${
                  index === 0
                    ? "md:row-span-2 md:h-full"
                    : "h-80"
                }`}
              />
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/contact"
              className="text-sm uppercase tracking-widest underline underline-offset-8"
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
          Let's create something
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-light tracking-tight sm:text-6xl">
          Have a story worth capturing?
        </h2>

        <Link
          to="/contact"
          className="mt-10 inline-block bg-black px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          Contact me
        </Link>
      </section>
    </PageLayout>
  );
}