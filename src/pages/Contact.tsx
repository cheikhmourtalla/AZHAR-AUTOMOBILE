import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_gl7ywcc",
        "template_emtxu3p",
        form,
        "dvJKZOfevJtb9Addj"
      )
      .then(
        () => {
          setStatus("success");
          form.reset();

          setTimeout(() => {
            setStatus("idle");
          }, 3000);
        },
        (error) => {
          console.error(error);
          setStatus("error");

          setTimeout(() => {
            setStatus("idle");
          }, 3000);
        }
      );
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
          Contactez-nous
        </h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Une question sur une voiture en location ou en vente ? Envoyez-nous un
          message.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Nos coordonnées
          </h2>
          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            Nous sommes disponibles pour répondre à vos besoins en location et
            en vente de véhicules.
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">Téléphone</p>
              <p className="text-sm sm:text-base">+221 78 296 43 86</p>
            </div>

            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm sm:text-base">+221 78 296 43 86</p>
            </div>

            <div>
              <p className="font-semibold">Email</p>
              <p className="break-words text-sm sm:text-base">
                momoseye2017@gmail.com
              </p>
            </div>

            <div>
              <p className="font-semibold">Adresse</p>
              <p className="text-sm sm:text-base">Yoff, Dakar, Sénégal</p>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-8">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Notre localisation
            </h3>

            <div className="overflow-hidden rounded-2xl shadow">
              <iframe
                title="Localisation AL AZHAR AUTOMOBILE"
                src="https://www.google.com/maps?q=Yoff,Dakar,Senegal&z=14&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Envoyer un message
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500 sm:text-base"
                placeholder="Votre nom complet"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500 sm:text-base"
                placeholder="Votre email"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="text"
                name="phone"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500 sm:text-base"
                placeholder="Votre numéro"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Sujet
              </label>
              <select
                name="subject"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500 sm:text-base"
                defaultValue="location"
              >
                <option value="location">Demande de location</option>
                <option value="vente">Demande d'achat</option>
                <option value="information">Demande d'information</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500 sm:text-base"
                placeholder="Écrivez votre message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
            </button>

            {status === "success" && (
              <div className="rounded-xl bg-green-100 px-4 py-3 text-sm text-green-700 sm:text-base">
                Votre message a été envoyé avec succès.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700 sm:text-base">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}