import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <NavLink
          to="/"
          className="text-sm font-medium uppercase tracking-[0.25em]"
        >
          Jane Doe
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-xs uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}