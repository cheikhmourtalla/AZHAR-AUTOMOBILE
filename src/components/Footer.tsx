import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* LOGO + DESCRIPTION */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <h2 className="text-lg font-bold text-orange-400">
              AL AZHAR AUTOMOBILE
            </h2>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Plateforme moderne de location et vente de voitures au Sénégal.
            Rapide, fiable et accessible à tous.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="mb-4 text-md font-semibold text-white">Navigation</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="transition hover:text-orange-400">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/cars" className="transition hover:text-orange-400">
                Voitures
              </Link>
            </li>
            <li>
              <Link
                to="/reservations"
                className="transition hover:text-orange-400"
              >
                Réservations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-orange-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-4 text-md font-semibold text-white">Contact</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>📞 +221 78 296 43 86</li>
            <li>📧 momoseye2017@gmail.com</li>
            <li>📍 Dakar, Sénégal</li>
          </ul>
        </div>

        {/* WHATSAPP */}
        <div>
          <h3 className="mb-4 text-md font-semibold text-white">Assistance</h3>

          <p className="mb-4 text-sm text-gray-400">
            Contactez-nous directement sur WhatsApp pour une réponse rapide.
          </p>

          <a
            href="https://wa.me/221782964386"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-xl bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © 2026 AL AZHAR AUTOMOBILE — Tous droits réservés
      </div>
    </footer>
  );
}