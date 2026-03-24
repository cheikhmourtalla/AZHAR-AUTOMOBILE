import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition ${
      isActive
        ? "text-orange-500"
        : "text-gray-700 hover:text-orange-500"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold text-orange-500 sm:text-lg md:text-xl">
                AL AZHAR AUTOMOBILE
              </p>
              <p className="hidden text-xs text-gray-500 sm:block">
                Location & Vente de véhicules
              </p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-5 lg:flex">
            <NavLink to="/" className={navLinkClass}>
              Accueil
            </NavLink>

            <NavLink to="/cars" className={navLinkClass}>
              Voitures
            </NavLink>

            <NavLink to="/reservations" className={navLinkClass}>
              Réservations
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            {user && (
              <span className="max-w-[180px] truncate text-sm text-gray-500">
                {user.email}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <span className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg lg:hidden">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </NavLink>

              <NavLink
                to="/cars"
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Voitures
              </NavLink>

              <NavLink
                to="/reservations"
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Réservations
              </NavLink>

              <NavLink
                to="/contact"
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>

              {user && (
                <div className="mt-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  Connecté : {user.email}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="mt-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}