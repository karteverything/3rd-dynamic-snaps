import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { api } from "../lib/api";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const project = String(formData.get("project") || "");
    const message = String(formData.get("message") || "");

    const fullMessage = project
      ? `Project type: ${project}\n\n${message}`
      : message;

    try {
      await api.submitContact({
        name,
        email,
        phone,
        message: fullMessage,
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <PageLayout>
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-40 sm:pb-36 sm:pt-48 lg:pb-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow text-neutral-400">
              Contact
            </p>

            <h1 className="page-title mt-7">
              Let's create
              <br />
              something.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:flex lg:items-end">
            <p className="body-copy max-w-md">
              Tell me a little about your shoot, event or
              project and I'll get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="bg-neutral-100 px-6 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-12 lg:gap-8">
            {/* Details */}
            <div className="lg:col-span-4">
              <p className="eyebrow text-neutral-400">
                Get in touch
              </p>

              <div className="mt-10 space-y-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                    Email
                  </p>

                  <a
                    href="mailto:hello@3rddynamicsnaps.com"
                    className="mt-3 block text-sm transition-opacity hover:opacity-50"
                  >
                    hello@3rddynamicsnaps.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                    Location
                  </p>

                  <p className="mt-3 text-sm">
                    South Africa
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                    Availability
                  </p>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-neutral-500">
                    Available for portraits, events, creative
                    projects and selected commissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              {submitted ? (
                <div className="border-t border-neutral-300 py-12">
                  <p className="eyebrow text-neutral-400">
                    Message sent
                  </p>

                  <h2 className="section-title mt-6">
                    Thank you.
                  </h2>

                  <p className="body-copy mt-6 max-w-md">
                    Your message has been received. I'll be
                    in touch soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-10 text-[11px] uppercase tracking-[0.2em] underline underline-offset-8 transition-opacity hover:opacity-50"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border-t border-neutral-300"
                >
                  {error && (
                    <div className="border-b border-red-200 py-5">
                      <p className="text-sm text-red-600">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Name */}
                  <div className="border-b border-neutral-300 py-7">
                    <label
                      htmlFor="name"
                      className="eyebrow text-neutral-500"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-4 w-full bg-transparent text-lg font-light outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="border-b border-neutral-300 py-7">
                    <label
                      htmlFor="email"
                      className="eyebrow text-neutral-500"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-4 w-full bg-transparent text-lg font-light outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="border-b border-neutral-300 py-7">
                    <label
                      htmlFor="phone"
                      className="eyebrow text-neutral-500"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Optional"
                      className="mt-4 w-full bg-transparent text-lg font-light outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Project type */}
                  <div className="border-b border-neutral-300 py-7">
                    <label
                      htmlFor="project"
                      className="eyebrow text-neutral-500"
                    >
                      Project
                    </label>

                    <select
                      id="project"
                      name="project"
                      defaultValue=""
                      className="mt-4 w-full bg-transparent text-lg font-light outline-none"
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>

                      <option value="portrait">
                        Portrait
                      </option>

                      <option value="event">
                        Event
                      </option>

                      <option value="creative">
                        Creative project
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="border-b border-neutral-300 py-7">
                    <label
                      htmlFor="message"
                      className="eyebrow text-neutral-500"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="mt-4 w-full resize-none bg-transparent text-lg font-light outline-none placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-xs leading-6 text-neutral-400">
                      By submitting this form, you agree to
                      being contacted regarding your enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-fit bg-black px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? "Sending..." : "Send enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">
            3rd Dynamic Snaps
          </p>

          <h2 className="page-title mt-7 max-w-5xl">
            Your moments.
            <br />
            Your story.
          </h2>

          <p className="mt-10 max-w-md text-sm leading-7 text-white/50">
            Let's turn the moments that matter into
            photographs you'll keep.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}