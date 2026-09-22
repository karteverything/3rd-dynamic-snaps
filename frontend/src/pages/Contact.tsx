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
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Contact
            </p>

            <h1 className="mt-6 text-5xl font-light tracking-tight sm:text-7xl">
              Let's create
              <br />
              something.
            </h1>

            <p className="mt-8 max-w-lg leading-8 text-neutral-600">
              Tell me a little about your shoot, event or project
              and I'll get back to you.
            </p>

            <div className="mt-12 space-y-3 text-sm text-neutral-600">
              <p>hello@3rddynamicsnaps.com</p>
              <p>South Africa</p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="border border-neutral-200 p-8">
                <h2 className="text-2xl font-light">
                  Thank you.
                </h2>

                <p className="mt-4 text-neutral-600">
                  Your message has been received.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Phone
                  </label>

                  <input
                    type="tel"
                    className="w-full border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Message
                  </label>

                  <textarea
                    required
                    rows={6}
                    className="w-full resize-none border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
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