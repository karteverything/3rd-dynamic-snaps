import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <NavLink
          to="/"
          className="text-sm font-medium tracking-tight text-white"
        >
          3RD DYNAMIC SNAPS
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.2em] transition ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          className="text-xs uppercase tracking-[0.2em] text-white md:hidden"
          type="button"
        >
          Menu
        </button>
      </div>
    </header>
  );
}