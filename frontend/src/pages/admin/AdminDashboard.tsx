import { Link } from "react-router-dom";
import AdminNav from "../../pages/admin/AdminNav";

const sections = [
  {
    title: "Photos",
    description: "Upload, publish, feature and manage your photography.",
    path: "/admin/photos",
  },
  {
    title: "About",
    description: "Edit the About page content.",
    path: "/admin/about",
  },
  {
    title: "Pricing",
    description: "Manage your photography packages and pricing.",
    path: "/admin/pricing",
  },
  {
    title: "Messages",
    description: "View enquiries submitted through the contact form.",
    path: "/admin/messages",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminNav />

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="border-b border-neutral-300 pb-8">
          <p className="eyebrow text-neutral-400">
            3rd Dynamic Snaps
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Dashboard
          </h1>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="group bg-white p-7 transition hover:bg-neutral-950 hover:text-white sm:p-9"
            >
              <p className="eyebrow text-neutral-400 transition group-hover:text-white/40">
                Admin
              </p>

              <h2 className="mt-5 text-2xl font-light">
                {section.title}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500 transition group-hover:text-white/50">
                {section.description}
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-white/50">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}