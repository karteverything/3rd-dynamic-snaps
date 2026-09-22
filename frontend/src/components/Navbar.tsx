import { NavLink, useLocation } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={`absolute left-0 right-0 top-0 z-50 ${
        isHome ? "text-white" : "text-neutral-950"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <NavLink
          to="/"
          className="text-sm font-medium tracking-[0.12em]"
        >
          3RD DYNAMIC SNAPS
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.2em] transition ${
                  isActive
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="text-[11px] uppercase tracking-[0.2em] md:hidden"
        >
          Menu
        </button>
      </div>
    </header>
  );
}