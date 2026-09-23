import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-40 sm:pb-36 sm:pt-48 lg:pb-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow text-neutral-400">
              About
            </p>

            <h1 className="page-title mt-7">
              Behind the
              <br />
              camera.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:flex lg:items-end">
            <p className="body-copy max-w-md">
              A photographer with a simple goal: to create
              images that feel as real as the moments they
              represent.
            </p>
          </div>
        </div>
      </section>

      {/* Photographer image + story */}
      <section className="bg-neutral-100 px-6 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            {/* Image */}
            <div className="lg:col-span-7">
              <div className="image-hover">
                <img
                  src="/about.jpg"
                  alt="Photographer"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                />
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-4 lg:col-start-9 lg:flex lg:items-center">
              <div>
                <p className="eyebrow text-neutral-400">
                  The approach
                </p>

                <h2 className="section-title mt-6">
                  Keep it real.
                </h2>

                <div className="body-copy mt-10 space-y-6">
                  <p>
                    I believe the strongest photographs happen
                    when people aren't thinking about the camera.
                  </p>

                  <p>
                    My approach is relaxed and observant. I look
                    for the small details, genuine expressions
                    and unexpected moments that make a photograph
                    feel personal.
                  </p>

                  <p>
                    Whether it's a portrait, event or creative
                    project, the goal remains the same: create
                    something you'll want to look at years from
                    now.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 transition-opacity hover:opacity-50"
                >
                  Work together
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-neutral-400">
              What matters
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-neutral-200">
              <div className="grid gap-6 border-b border-neutral-200 py-10 sm:grid-cols-[100px_1fr]">
                <span className="text-xs text-neutral-400">
                  01
                </span>

                <div>
                  <h3 className="text-2xl font-light sm:text-3xl">
                    Authenticity
                  </h3>

                  <p className="body-copy mt-4 max-w-xl">
                    Real expressions, real connections and
                    photographs that don't feel manufactured.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 border-b border-neutral-200 py-10 sm:grid-cols-[100px_1fr]">
                <span className="text-xs text-neutral-400">
                  02
                </span>

                <div>
                  <h3 className="text-2xl font-light sm:text-3xl">
                    Attention
                  </h3>

                  <p className="body-copy mt-4 max-w-xl">
                    The little details often tell the biggest
                    stories. Nothing important should go
                    unnoticed.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 border-b border-neutral-200 py-10 sm:grid-cols-[100px_1fr]">
                <span className="text-xs text-neutral-400">
                  03
                </span>

                <div>
                  <h3 className="text-2xl font-light sm:text-3xl">
                    Timelessness
                  </h3>

                  <p className="body-copy mt-4 max-w-xl">
                    Trends come and go. The photographs should
                    still mean something years from now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">
            Let's create
          </p>

          <h2 className="page-title mt-7 max-w-5xl">
            Your story
            <br />
            starts here.
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