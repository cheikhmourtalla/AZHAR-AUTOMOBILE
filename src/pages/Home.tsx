import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import promoVideo from "../assets/video.mp4";

export default function Home() {
  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span>Location & Vente de véhicules</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Trouvez la voiture idéale pour vos trajets au Sénégal
            </h1>

            <p className="mt-5 max-w-xl text-base text-gray-200 sm:text-lg">
              Des véhicules modernes, fiables et bien entretenus pour la
              location ou l’achat. Réservez rapidement et contactez-nous
              facilement pour finaliser votre choix.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/cars"
                className="rounded-xl bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
              >
                Voir nos véhicules
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Nous contacter
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-orange-400">50+</p>
                <p className="text-sm text-gray-200">Véhicules</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold text-orange-400">24/7</p>
                <p className="text-sm text-gray-200">Assistance</p>
              </div>

              <div className="col-span-2 rounded-2xl bg-white/10 p-4 backdrop-blur sm:col-span-1">
                <p className="text-2xl font-extrabold text-orange-400">100%</p>
                <p className="text-sm text-gray-200">Fiabilité</p>
              </div>
            </div>
          </div>

          {/* BLOC VISUEL DROIT */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 text-gray-900 shadow-2xl sm:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop"
                alt="Voiture premium"
                className="h-60 w-full rounded-2xl object-cover sm:h-72"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Véhicules premium</p>
                  <h3 className="text-xl font-bold">
                    Confort, style et sécurité
                  </h3>
                </div>
                <Link
                  to="/cars"
                  className="rounded-xl bg-orange-500 px-5 py-2 text-center font-semibold text-white hover:bg-orange-600"
                >
                  Explorer
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-orange-500 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-wide text-orange-100">
                Offres du moment
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                Réservez rapidement
              </h3>
              <p className="mt-3 text-sm text-orange-50">
                Des véhicules adaptés aux familles, aux professionnels et aux
                déplacements urbains.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-gray-900 shadow-xl">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Contact direct
              </p>
              <h3 className="mt-2 text-2xl font-bold">WhatsApp & Email</h3>
              <p className="mt-3 text-sm text-gray-600">
                Contactez-nous facilement pour acheter ou réserver votre
                véhicule.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION INTRO AVANT VIDEO */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
              Découvrir
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Pourquoi choisir AL AZHAR AUTOMOBILE ?
            </h2>
          </div>

          <p className="max-w-xl text-sm text-gray-600 sm:text-base">
            Des véhicules adaptés à la ville, aux familles, aux professionnels
            et aux transports de bagages avec un service moderne et rapide.
          </p>
        </div>

        {/* SECTION VIDEO */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-[500px] w-full object-cover sm:h-[550px] lg:h-[620px]"
          >
            <source src={promoVideo} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéo.
          </video>

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Contenu sur la vidéo */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
                Nos services
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Une expérience automobile moderne, rapide et fiable
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base lg:text-lg">
                Nous vous proposons des voitures pour la location et la vente,
                avec un service simple, rapide et adapté à vos besoins.
                Réservez, payez et contactez-nous facilement.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/cars"
                  className="rounded-xl bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                >
                  Voir les véhicules
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            {/* Cartes du bas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-extrabold text-orange-400">50+</p>
                <p className="text-sm text-white">Véhicules disponibles</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-extrabold text-orange-400">24/7</p>
                <p className="text-sm text-white">Assistance client</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-extrabold text-orange-400">100%</p>
                <p className="text-sm text-white">Fiabilité et confort</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-extrabold text-orange-400">2 en 1</p>
                <p className="text-sm text-white">Location & vente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CTA */}
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="rounded-[2rem] bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-10 text-white shadow-xl sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-orange-100">
                Réservation rapide
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Besoin d’un véhicule maintenant ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-orange-50 sm:text-base">
                Réservez en quelques clics, choisissez votre mode de paiement
                simulé, puis contactez-nous facilement pour finaliser.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/cars"
                className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-orange-600 hover:bg-gray-100"
              >
                Réserver
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-white px-6 py-3 text-center font-semibold text-white hover:bg-white hover:text-orange-600"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}