import { useState } from "react";
import type { Car } from "../types/car";
import { isValidPhone, todayString, calcDays, formatFCFA } from "../utils/validation";
import { WHATSAPP_NUMBER } from "../config/constants";

type ReservationFormProps = {
  car: Car;
  onConfirm: (data: { carId: number; startDate: string; endDate: string; notes?: string }) => Promise<void>;
  onClose: () => void;
};

export default function ReservationForm({ car, onConfirm, onClose }: ReservationFormProps) {
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const pricePerDay = car.pricePerDay ?? 0;
  const today = todayString();
  const totalDays = calcDays(startDate, endDate);
  const totalPrice = totalDays * pricePerDay;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (phone && !isValidPhone(phone)) e.phone = "Numéro invalide. Format : 7X XXX XX XX";
    if (!startDate) e.startDate = "Date de début requise.";
    if (!endDate) e.endDate = "Date de fin requise.";
    if (startDate && endDate && new Date(endDate) < new Date(startDate))
      e.endDate = "La date de fin doit être après la date de début.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const msg = encodeURIComponent(
        `Bonjour AL AZHAR AUTOMOBILE,\n\nNouvelle demande de réservation :\n\n` +
        `🚗 Véhicule : ${car.name}\n` +
        `📅 Du : ${new Date(startDate).toLocaleDateString("fr-FR")}\n` +
        `📅 Au : ${new Date(endDate).toLocaleDateString("fr-FR")}\n` +
        `💰 Montant estimé : ${formatFCFA(totalPrice)}\n\n` +
        `Merci de confirmer la disponibilité.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");

      await onConfirm({ carId: car.id, startDate, endDate, notes: notes || undefined });
    } catch (err: any) {
      setApiError(err.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-4" noValidate>
      {/* Récap voiture */}
      <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 border border-gray-100">
        <img src={car.image} alt={car.name} className="h-16 w-24 rounded-xl object-cover flex-shrink-0" />
        <div>
          <h3 className="font-bold text-gray-800">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.brand} · {car.category}</p>
          <p className="text-sm font-semibold text-orange-600 mt-0.5">{formatFCFA(pricePerDay)} / jour</p>
        </div>
      </div>

      {/* Téléphone (optionnel) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="77 000 00 00"
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
            errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
          }`}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Date début <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (endDate && e.target.value > endDate) setEndDate("");
            }}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
              errors.startDate ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Date fin <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
              errors.endDate ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Notes <span className="text-gray-400 text-xs">(optionnel)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Ex: livraison à l'aéroport..."
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      {/* Total */}
      {totalDays > 0 && (
        <div className="rounded-xl bg-orange-50 border border-orange-100 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">{totalDays} jour{totalDays > 1 ? "s" : ""} × {formatFCFA(pricePerDay)}</p>
            <p className="text-2xl font-extrabold text-orange-600 mt-0.5">{formatFCFA(totalPrice)}</p>
          </div>
          <span className="text-3xl">🧾</span>
        </div>
      )}

      {/* Info paiement */}
      <div className="flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
        <span className="mt-0.5">💬</span>
        <p>Le paiement sera convenu directement avec notre équipe après confirmation sur WhatsApp.</p>
      </div>

      {/* Erreur API */}
      {apiError && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
          {apiError}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row pt-1">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60 active:scale-[.98]"
        >
          {loading ? "Envoi en cours..." : "Envoyer la demande via WhatsApp"}
        </button>
      </div>
    </form>
  );
}