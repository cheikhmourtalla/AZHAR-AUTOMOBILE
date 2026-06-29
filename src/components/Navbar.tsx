import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import { COMPANY } from "../config/constants";

type NavbarProps = {
  reservationCount?: number;
  user?: { name: string; role: string } | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
};

export default function Navbar({ reservationCount = 0, user, onLoginClick, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors ${isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
      isActive ? "bg-orange-50 text-orange-500" : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-3 group">
            <img src={logo} alt="Logo AL AZHAR" className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100 transition group-hover:ring-orange-300 sm:h-11 sm:w-11" />
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold text-orange-500 tracking-tight sm:text-lg">{COMPANY.name}</p>
              <p className="hidden text-xs text-gray-500 sm:block">{COMPANY.tagline}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" end className={navLinkClass}>Accueil</NavLink>
            <NavLink to="/cars" className={navLinkClass}>Voitures</NavLink>
            <NavLink to="/reservations" className={navLinkClass}>
              <span className="relative">
                Réservations
                {reservationCount > 0 && (
                  <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {reservationCount > 9 ? "9+" : reservationCount}
                  </span>
                )}
              </span>
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-24 truncate">{user.name}</span>
                  <span className="text-gray-400">▾</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-100 bg-white shadow-lg">
                    <div className="px-4 py-3 border-b">
                      <p className="text-xs text-gray-400">Connecté en tant que</p>
                      <p className="text-sm font-semibold text-gray-700 truncate">{user.name}</p>
                      <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
                        {user.role === "admin" ? "Administrateur" : "Client"}
                      </span>
                    </div>
                    <button
                      onClick={() => { onLogout?.(); setUserMenuOpen(false); }}
                      className="w-full px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50 rounded-b-2xl"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Se connecter
              </button>
            )}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 lg:hidden"
          >
            {reservationCount > 0 && !isOpen && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {reservationCount > 9 ? "9+" : reservationCount}
              </span>
            )}
            <span className="text-xl">{isOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg lg:hidden">
            <div className="flex flex-col gap-1">
              <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Accueil</NavLink>
              <NavLink to="/cars" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Voitures</NavLink>
              <NavLink to="/reservations" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                <span>Réservations</span>
                {reservationCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {reservationCount > 9 ? "9+" : reservationCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
              <div className="border-t border-gray-100 mt-1 pt-1">
                {user ? (
                  <button
                    onClick={() => { onLogout?.(); setIsOpen(false); }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 transition"
                  >
                    Se déconnecter ({user.name})
                  </button>
                ) : (
                  <button
                    onClick={() => { onLoginClick?.(); setIsOpen(false); }}
                    className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Se connecter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}