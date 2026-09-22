import { FormEvent, useState } from "react";
import PageLayout from "../components/PageLayout";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageLayout>
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-40">
        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-neutral-400">
              Contact
            </p>

            <h1 className="page-title mt-7">
              Let's create
              <br />
              something.
            </h1>

            <p className="body-copy mt-10 max-w-md">
              Tell me a little about your shoot, event or
              project and I'll get back to you.
            </p>

            <div className="mt-14 text-sm">
              <p className="text-neutral-400">
                Email
              </p>

              <p className="mt-2">
                hello@3rddynamicsnaps.com
              </p>

              <p className="mt-8 text-neutral-400">
                Location
              </p>

              <p className="mt-2">
                South Africa
              </p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="border-t border-neutral-200 py-10">
                <p className="eyebrow text-neutral-400">
                  Message sent
                </p>

                <h2 className="section-title mt-6">
                  Thank you.
                </h2>

                <p className="body-copy mt-6">
                  Your message has been received. I'll be in
                  touch soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[11px] uppercase tracking-[0.2em] underline underline-offset-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border-t border-neutral-200"
              >
                <div className="border-b border-neutral-200 py-6">
                  <label className="eyebrow text-neutral-400">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    className="mt-4 w-full bg-transparent text-lg outline-none placeholder:text-neutral-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <label className="eyebrow text-neutral-400">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    className="mt-4 w-full bg-transparent text-lg outline-none placeholder:text-neutral-300"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <label className="eyebrow text-neutral-400">
                    Phone
                  </label>

                  <input
                    type="tel"
                    className="mt-4 w-full bg-transparent text-lg outline-none placeholder:text-neutral-300"
                    placeholder="Optional"
                  />
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <label className="eyebrow text-neutral-400">
                    Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    className="mt-4 w-full resize-none bg-transparent text-lg outline-none placeholder:text-neutral-300"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 bg-black px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
                >
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}