import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isHome && !scrolled && !menuOpen
          ? "text-white"
          : "bg-white/95 text-neutral-950 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-[21px] font-medium tracking-[0.12em]"
        >
          3RD DYNAMIC SNAPS
        </NavLink>

        {/* Desktop navigation */}
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

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-[11px] uppercase tracking-[0.2em] md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="min-h-screen bg-white px-6 pb-12 pt-8 text-neutral-950 md:hidden">
          <nav className="flex flex-col">
            {links.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-neutral-200 py-6 text-4xl font-light tracking-tight ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`
                }
              >
                <span className="mr-4 text-xs text-neutral-400">
                  0{index + 1}
                </span>

                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}