import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main>
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Featured photograph"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
            <p className="mb-5 text-xs uppercase tracking-[0.3em]">
              Photographer
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Stories
              <br />
              in light.
            </h1>

            <a
              href="#work"
              className="mt-10 inline-block border-b border-white/60 pb-2 text-xs uppercase tracking-[0.25em]"
            >
              Explore the work
            </a>
          </div>
        </section>

        <section className="bg-white px-6 py-28 text-neutral-950 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Photography with intention
            </p>

            <h2 className="mt-6 text-4xl font-light leading-tight sm:text-5xl">
              Honest moments.
              <br />
              Beautifully preserved.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-neutral-600">
              A short introduction to the photographer and the way they
              approach their work.
            </p>
          </div>
        </section>

        <section
          id="work"
          className="bg-white px-6 pb-28 text-neutral-950 lg:px-10 lg:pb-40"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="text-3xl font-light sm:text-4xl">
                Selected work
              </h2>

              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                01 — 06
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <img
                src="/images/photo-1.jpg"
                alt="Selected photograph"
                className="aspect-[4/5] w-full object-cover"
              />

              <img
                src="/images/photo-2.jpg"
                alt="Selected photograph"
                className="mt-0 aspect-[4/5] w-full object-cover sm:mt-24"
              />

              <img
                src="/images/photo-3.jpg"
                alt="Selected photograph"
                className="aspect-[4/5] w-full object-cover"
              />

              <img
                src="/images/photo-4.jpg"
                alt="Selected photograph"
                className="mt-0 aspect-[4/5] w-full object-cover sm:mt-24"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}