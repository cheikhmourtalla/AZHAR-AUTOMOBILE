import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { COMPANY, WHATSAPP_URL } from "../config/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-400/30" />
            <h2 className="text-lg font-bold text-orange-400">{COMPANY.name}</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Plateforme moderne de location et vente de voitures au Sénégal. Rapide, fiable et accessible à tous.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Navigation</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              { to: "/", label: "Accueil" },
              { to: "/cars", label: "Voitures" },
              { to: "/reservations", label: "Réservations" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-orange-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-orange-400 transition">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-orange-400 transition break-all">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>

        {/* WhatsApp */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Assistance 24/7</h3>
          <p className="mb-4 text-sm text-gray-400">
            Contactez-nous directement sur WhatsApp pour une réponse rapide.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 active:scale-[.98]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {year} {COMPANY.name} — Tous droits réservés
      </div>
    </footer>
  );
}