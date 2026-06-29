import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import promoVideo from "../assets/video.mp4";
import { COMPANY, WHATSAPP_URL } from "../config/constants";
import { carsData } from "../data/cars";

const rentalCount = carsData.filter((c) => c.purpose === "location" && c.available).length;
const saleCount = carsData.filter((c) => c.purpose === "vente").length;

const services = [
  {
    icon: "🚗",
    title: "Location de courte durée",
    desc: "À la journée ou à la semaine, réservez en ligne et récupérez votre véhicule rapidement. Paiement par Wave ou Orange Money.",
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    icon: "🏷️",
    title: "Vente de véhicules",
    desc: "Des voitures d'occasion soigneusement sélectionnées — berlines, SUV, utilitaires — à des prix compétitifs sur le marché dakarois.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "💬",
    title: "Accompagnement WhatsApp",
    desc: "Notre équipe répond 7j/7 sur WhatsApp. Devis, disponibilités, négociation — tout se règle simplement depuis votre téléphone.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: "⚡",
    title: "Réservation instantanée",
    desc: "Formulaire rapide, paiement simulé, confirmation immédiate. Votre réservation est enregistrée en moins de 2 minutes.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
  },
];

const steps = [
  { num: "01", title: "Choisissez votre voiture", desc: "Parcourez la flotte, filtrez par catégorie ou prix, consultez les détails." },
  { num: "02", title: "Remplissez le formulaire", desc: "Nom, téléphone, dates de location — 30 secondes chrono." },
  { num: "03", title: "Simulez le paiement", desc: "Wave ou Orange Money, le montant total est calculé automatiquement." },
  { num: "04", title: "On vous confirme", desc: "Notre équipe reçoit votre demande sur WhatsApp et vous contacte pour finaliser." },
];

const categories = [
  { label: "SUV", emoji: "🚙", count: carsData.filter(c => c.category === "SUV").length },
  { label: "Berline", emoji: "🚗", count: carsData.filter(c => c.category === "Berline").length },
  { label: "Utilitaire", emoji: "🚐", count: carsData.filter(c => c.category === "Utilitaire").length },
  { label: "Citadine", emoji: "🚕", count: carsData.filter(c => c.category === "Citadine").length },
  { label: "Luxe", emoji: "🏎️", count: carsData.filter(c => c.category === "Luxe").length },
];

export default function Home() {
  return (
    <div className="bg-white">

      {/* ═══════════════════════════════════════
          HERO — plein écran, image + texte fort
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] overflow-hidden bg-gray-950 text-white flex items-center">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')" }}
        />
        {/* Dégradé sur l'image */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />

        {/* Contenu */}
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <img src={logo} alt="Logo" className="h-6 w-6 rounded-full object-cover" />
            <span className="text-white/90">{COMPANY.name}</span>
            <span className="h-1 w-1 rounded-full bg-orange-400" />
            <span className="text-orange-300">Dakar, Sénégal</span>
          </div>

          {/* Titre principal */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Votre voiture,{" "}
            <span className="text-orange-400">disponible</span>
            <br />
            dès aujourd'hui.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Location à la journée ou achat — des véhicules modernes, bien entretenus,
            pour tous les budgets. Réservez en ligne en 2 minutes.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-400 active:scale-[.98]"
            >
              Voir les véhicules
              <span className="text-orange-200">→</span>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Stats — une seule fois, bien présentées */}
          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-extrabold text-orange-400">{rentalCount}</p>
              <p className="mt-0.5 text-sm text-gray-400">Voitures disponibles à la location</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-400">{saleCount}</p>
              <p className="mt-0.5 text-sm text-gray-400">Véhicules à vendre</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-400">24/7</p>
              <p className="mt-0.5 text-sm text-gray-400">Assistance WhatsApp</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-orange-400">Wave</p>
              <p className="mt-0.5 text-sm text-gray-400">& Orange Money acceptés</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATÉGORIES — navigation rapide par type
      ═══════════════════════════════════════ */}
      <section className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {categories.map(({ label, emoji, count }) => (
              <Link
                key={label}
                to="/cars"
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <span className="text-lg">{emoji}</span>
                <span>{label}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{count}</span>
              </Link>
            ))}
            <Link
              to="/cars"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Tout voir →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION VIDÉO — une seule fois, bien faite
      ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">AL AZHAR AUTOMOBILE</p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Une flotte moderne au cœur de Dakar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            Depuis Yoff, nous servons particuliers et professionnels avec des véhicules
            rigoureusement entretenus — du citadin au tout-terrain.
          </p>
        </div>

        {/* Vidéo pleine largeur */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <video autoPlay muted loop playsInline className="h-[480px] w-full object-cover sm:h-[540px] lg:h-[600px]">
            <source src={promoVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Overlay bas */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Notre flotte</p>
                <h3 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                  Berlines · SUV · Utilitaires · Luxe
                </h3>
              </div>
              <Link
                to="/cars"
                className="w-fit rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400 active:scale-[.98]"
              >
                Découvrir les véhicules →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NOS SERVICES — 4 cartes distinctes
      ═══════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Ce qu'on propose</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Nos services</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon, title, desc, color, iconBg }) => (
              <div key={title} className={`rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md ${color}`}>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconBg}`}>
                  {icon}
                </div>
                <h3 className="mb-2 font-bold text-gray-800">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMMENT ÇA MARCHE — processus en 4 étapes
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Simple et rapide</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Comment réserver ?</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="relative">
                {/* Connecteur horizontal (desktop) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-6 hidden h-0.5 w-[calc(100%-4rem)] bg-orange-100 lg:block" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-extrabold text-white shadow-lg shadow-orange-200">
                    {num}
                  </div>
                  <h3 className="mb-2 font-bold text-gray-800">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[.98]"
            >
              Je commence ma réservation →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA FINAL — WhatsApp + Contact
      ═══════════════════════════════════════ */}
      <section className="bg-gray-900 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">On est là pour vous</p>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Une question ? Un devis ?<br />Écrivez-nous maintenant.
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Notre équipe répond sur WhatsApp 7j/7. Réponse garantie sous quelques heures.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-7 py-3.5 font-semibold text-white transition hover:bg-green-400 sm:w-auto"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Écrire sur WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Formulaire de contact
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            📍 {COMPANY.address} · {COMPANY.phone}
          </p>
        </div>
      </section>

    </div>
  );
}