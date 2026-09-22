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
      <section className="relative flex min-h-screen items-end overflow-hidden bg-neutral-900">
        <img
          src="/images/hero.jpg"
          alt="Featured photography"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32">
          <p className="eyebrow mb-7 text-white/70">
            Photography
          </p>

          <h1 className="page-title max-w-5xl text-white">
            Moments worth
            <br />
            remembering.
          </h1>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/70">
              Authentic photography capturing people,
              places and moments with intention.
            </p>

            <Link
              to="/contact"
              className="w-fit border border-white/60 px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-neutral-400">
              01 — Philosophy
            </p>
          </div>

          <div>
            <h2 className="section-title">
              Photography that feels natural, honest and timeless.
            </h2>

            <p className="body-copy mt-10 max-w-xl">
              The best photographs don't feel forced. They're
              moments that happen naturally, captured with
              intention and care.
            </p>

            <Link
              to="/about"
              className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-8"
            >
              Discover more
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-neutral-100 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow text-neutral-400">
            02 — Selected work
          </p>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="section-title">
              Recent work.
            </h2>

            <p className="max-w-sm text-sm leading-7 text-neutral-500">
              A selection of photographs from recent sessions
              and projects.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="image-hover md:row-span-2">
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                className="h-full min-h-[500px] w-full object-cover"
              />
            </div>

            <div className="image-hover">
              <img
                src={photos[1].src}
                alt={photos[1].alt}
                className="h-[360px] w-full object-cover"
              />
            </div>

            <div className="image-hover">
              <img
                src={photos[2].src}
                alt={photos[2].alt}
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="image-hover">
            <img
              src="/images/about.jpg"
              alt="Photographer"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="lg:pl-16">
            <p className="eyebrow text-neutral-400">
              03 — About
            </p>

            <h2 className="section-title mt-6">
              Behind the camera.
            </h2>

            <p className="body-copy mt-10 max-w-xl">
              Every shoot is an opportunity to tell a story.
              My approach is relaxed, intentional and focused
              on creating photographs that remain meaningful
              long after the moment has passed.
            </p>

            <Link
              to="/about"
              className="mt-10 inline-block border-b border-black pb-2 text-[11px] uppercase tracking-[0.2em]"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">
            04 — Let's work together
          </p>

          <h2 className="page-title mt-7 max-w-5xl">
            Have a story
            <br />
            worth capturing?
          </h2>

          <Link
            to="/contact"
            className="mt-12 inline-block border border-white/50 px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}