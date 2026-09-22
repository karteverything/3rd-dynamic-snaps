import PageLayout from "../components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              About
            </p>

            <h1 className="mt-6 text-5xl font-light tracking-tight sm:text-7xl">
              Behind the
              <br />
              camera.
            </h1>
          </div>

          <div>
            <img
              src="/images/about.jpg"
              alt="Photographer"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-24 max-w-3xl">
          <h2 className="text-3xl font-light">
            My approach
          </h2>

          <div className="mt-8 space-y-6 leading-8 text-neutral-600">
            <p>
              I believe the best photographs happen when people
              feel comfortable being themselves.
            </p>

            <p>
              My goal is to create photographs that don't just
              look good, but bring you back to the feeling of
              the moment.
            </p>

            <p>
              Whether it's a personal portrait, a special event,
              or a creative project, every shoot is approached
              with the same attention to detail.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}