import { useState } from "react";
import emailjs from "@emailjs/browser";
import { COMPANY, EMAILJS_CONFIG, WHATSAPP_URL } from "../config/constants";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    emailjs
      .sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form, EMAILJS_CONFIG.publicKey)
      .then(() => {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  const contactItems = [
    { icon: "📞", label: "Téléphone", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
    { icon: "💬", label: "WhatsApp", value: COMPANY.phone, href: WHATSAPP_URL },
    { icon: "📧", label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: "📍", label: "Adresse", value: COMPANY.address, href: null },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-500">Parlons-nous</p>
        <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">Contactez-nous</h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Une question sur une voiture ? Nous répondons rapidement.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Coordonnées */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800">Nos coordonnées</h2>
            <p className="mt-2 text-sm text-gray-500">Disponibles 7j/7 pour vos demandes.</p>

            <ul className="mt-6 space-y-4">
              {contactItems.map(({ icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        className="text-sm font-medium text-gray-700 hover:text-orange-500 transition">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-700">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Écrire sur WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100">
            <iframe
              title="Localisation AL AZHAR AUTOMOBILE"
              src="https://www.google.com/maps?q=Yoff,Dakar,Senegal&z=14&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Formulaire */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800">Envoyer un message</h2>
          <p className="mt-1 text-sm text-gray-500">Réponse garantie sous 24h.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Nom complet *</label>
                <input type="text" name="name" required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  placeholder="Votre nom" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" name="phone"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  placeholder="77 000 00 00" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="email" required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="votre@email.com" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Sujet</label>
              <select name="subject" defaultValue="location"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                <option value="location">Demande de location</option>
                <option value="vente">Demande d'achat</option>
                <option value="information">Demande d'information</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Message *</label>
              <textarea name="message" required rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="Décrivez votre besoin..." />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[.98]"
            >
              {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
            </button>

            {status === "success" && (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200">
                <span className="text-xl">✅</span>
                <span>Message envoyé avec succès ! Nous vous répondrons sous 24h.</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                <span className="text-xl">❌</span>
                <span>Erreur lors de l'envoi. Contactez-nous directement sur WhatsApp.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}