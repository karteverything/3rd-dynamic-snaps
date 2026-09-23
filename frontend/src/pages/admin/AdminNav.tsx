import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const links = [
  { label: "Photos", path: "/admin/photos" },
  { label: "About", path: "/admin/about" },
  { label: "Pricing", path: "/admin/pricing" },
  { label: "Messages", path: "/admin/messages" },
];

export default function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <nav className="border-b border-neutral-300 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition ${
                  active
                    ? "bg-black text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-fit text-[10px] uppercase tracking-[0.18em] text-neutral-400 transition hover:text-black"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}