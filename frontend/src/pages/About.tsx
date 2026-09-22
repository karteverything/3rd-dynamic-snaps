import PageLayout from "../components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-neutral-400">
              About
            </p>

            <h1 className="page-title mt-7">
              Behind the
              <br />
              camera.
            </h1>
          </div>

          <div>
            <p className="body-copy max-w-lg">
              A photographer with a simple goal: to create
              images that feel as real as the moments they
              represent.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="image-hover">
            <img
              src="/images/about.jpg"
              alt="Photographer"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}