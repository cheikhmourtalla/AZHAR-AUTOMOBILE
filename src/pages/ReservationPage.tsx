import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { carsData } from "../data/cars";
import type { Car } from "../types/car";
import { todayString, calcDays, formatFCFA } from "../utils/validation";
import { WHATSAPP_NUMBER } from "../config/constants";

type ReservationPageProps = {
  onAddReservation: (data: {
    carId: number;
    startDate: string;
    endDate: string;
    notes?: string;
  }) => Promise<any>;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
};

export default function ReservationPage({
  onAddReservation,
  isAuthenticated,
  onLoginRequired,
}: ReservationPageProps) {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const today = todayString();
  const totalDays = calcDays(startDate, endDate);
  const totalPrice = totalDays * (car?.pricePerDay ?? 0);

  useEffect(() => {
    const found = carsData.find((c) => c.id === Number(carId));
    if (!found || found.purpose !== "location") {
      navigate("/cars");
      return;
    }
    setCar(found);
  }, [carId, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      onLoginRequired();
    }
  }, [isAuthenticated, onLoginRequired]);

  if (!car) return null;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!startDate) e.startDate = "Date de début requise.";
    if (!endDate) e.endDate = "Date de fin requise.";
    if (startDate && endDate && new Date(endDate) <= new Date(startDate))
      e.endDate = "La date de fin doit être après la date de début.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!isAuthenticated) { onLoginRequired(); return; }
    setLoading(true);
    setApiError("");
    try {
      await onAddReservation({
        carId: car.id,
        startDate,
        endDate,
        notes: notes || undefined,
      });

      const msg = encodeURIComponent(
        `Bonjour AL AZHAR AUTOMOBILE 👋\n\nNouvelle demande de réservation :\n\n` +
        `🚗 Véhicule : ${car.name}\n` +
        `📅 Du : ${new Date(startDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}\n` +
        `📅 Au : ${new Date(endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}\n` +
        `🗓️ Durée : ${totalDays} jour${totalDays > 1 ? "s" : ""}\n` +
        `💰 Montant estimé : ${formatFCFA(totalPrice)}\n` +
        (notes ? `📝 Notes : ${notes}\n` : "") +
        `\nMerci de confirmer la disponibilité.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      setSuccess(true);
    } catch (err: any) {
      setApiError(err.message || "Erreur lors de la réservation. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Écran de succès ───────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-4xl">
            ✅
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Demande envoyée !
          </h1>
          <p className="mt-3 text-gray-500">
            Votre demande pour la <span className="font-semibold text-gray-700">{car.name}</span> a été enregistrée.
            Notre équipe vous contactera rapidement sur WhatsApp pour confirmer.
          </p>

          <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-5 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Véhicule</span>
              <span className="font-semibold text-gray-800">{car.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Période</span>
              <span className="font-semibold text-gray-800">
                {new Date(startDate).toLocaleDateString("fr-FR")} → {new Date(endDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Durée</span>
              <span className="font-semibold text-gray-800">{totalDays} jour{totalDays > 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-sm">
              <span className="text-gray-500">Montant estimé</span>
              <span className="font-extrabold text-orange-600">{formatFCFA(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/reservations"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Voir mes réservations
            </Link>
            <Link
              to="/cars"
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Retour aux voitures
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Formulaire ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link to="/cars" className="hover:text-orange-500 transition">Voitures</Link>
        <span>/</span>
        <span className="text-gray-600">Réservation</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">

        {/* ── Colonne gauche : récap voiture ── */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-5">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-md">
              <img
                src={car.image}
                alt={car.name}
                className="h-56 w-full object-cover"
              />
            </div>

            {/* Infos voiture */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Disponible
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">{car.name}</h2>
              <p className="text-sm text-gray-500">{car.brand} · {car.category}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: "👥", label: `${car.seats} places` },
                  { icon: "⚙️", label: car.transmission },
                  { icon: "⛽", label: car.fuel },
                  { icon: "🏷️", label: `${formatFCFA(car.pricePerDay ?? 0)}/j`, bold: true },
                ].map(({ icon, label, bold }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${
                      bold ? "bg-orange-50 font-bold text-orange-600" : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-gray-500 line-clamp-3">
                {car.description}
              </p>
            </div>

            {/* Récap prix — visible uniquement si dates sélectionnées */}
            {totalDays > 0 && (
              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                <p className="mb-3 text-sm font-semibold text-orange-700">Récapitulatif</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{formatFCFA(car.pricePerDay ?? 0)} × {totalDays} jour{totalDays > 1 ? "s" : ""}</span>
                    <span>{formatFCFA(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between border-t border-orange-200 pt-2 font-extrabold text-orange-700">
                    <span>Total estimé</span>
                    <span className="text-xl">{formatFCFA(totalPrice)}</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-orange-500">
                  Le montant final sera confirmé par notre équipe.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Colonne droite : formulaire ── */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Demande de réservation
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Remplissez le formulaire — nous vous confirmons sous 24h via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

              {/* Dates */}
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Période de location <span className="text-red-500">*</span>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={today}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && e.target.value >= endDate) setEndDate("");
                      }}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                        errors.startDate ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || today}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                        errors.endDate ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                {/* Durée calculée */}
                {totalDays > 0 && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm text-blue-700">
                    <span>🗓️</span>
                    <span>
                      <span className="font-semibold">{totalDays} jour{totalDays > 1 ? "s" : ""}</span> de location sélectionnés
                    </span>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Instructions spéciales
                  <span className="ml-1 normal-case text-gray-400">(optionnel)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Ex : livraison à l'aéroport, besoin d'un siège enfant, heure de prise en charge..."
                  className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Info paiement */}
              <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
                <span className="mt-0.5 text-base">💬</span>
                <div>
                  <p className="font-semibold">Paiement après confirmation</p>
                  <p className="mt-0.5 text-blue-600">
                    Wave ou Orange Money — notre équipe vous contacte sur WhatsApp pour finaliser.
                  </p>
                </div>
              </div>

              {/* Erreur API */}
              {apiError && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
                  <span>⚠️</span>
                  <p>{apiError}</p>
                </div>
              )}

              {/* Boutons */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <Link
                  to="/cars"
                  className="flex w-full items-center justify-center rounded-2xl border border-gray-200 px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  ← Retour
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60 active:scale-[.98]"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Envoyer via WhatsApp
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}