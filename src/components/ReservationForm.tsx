import { useState } from "react";
import type { Car, Reservation } from "../types/car";

type ReservationFormProps = {
  car: Car;
  onContinueToPayment: (
    reservation: Omit<Reservation, "id" | "paymentMethod" | "paymentStatus">
  ) => void;
  onClose: () => void;
};

export default function ReservationForm({
  car,
  onContinueToPayment,
  onClose,
}: ReservationFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const pricePerDay = car.pricePerDay ?? 0;

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diff = end - start;

    if (diff < 0) return 0;

    return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * pricePerDay;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (car.purpose !== "location" || !car.pricePerDay) {
      setError("Cette voiture n'est pas disponible en location.");
      return;
    }

    if (!customerName || !phone || !startDate || !endDate) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("La date de fin doit être après la date de début.");
      return;
    }

    setError("");

    onContinueToPayment({
      carId: car.id,
      carName: car.name,
      customerName,
      phone,
      startDate,
      endDate,
      totalPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-4">
      <div className="rounded-xl bg-orange-50 p-4">
        <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
        <p className="text-sm text-gray-600">
          Prix : {pricePerDay.toLocaleString()} FCFA / jour
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Nom complet
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:border-orange-500"
          placeholder="Entrez votre nom"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:border-orange-500"
          placeholder="Entrez votre numéro"
        />
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date début
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date fin
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="rounded-xl bg-gray-100 p-4">
        <p className="text-sm text-gray-700">
          Nombre de jours : {totalDays}
        </p>
        <p className="text-2xl font-bold text-orange-600">
          Total : {totalPrice.toLocaleString()} FCFA
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Continuer vers le paiement
        </button>
      </div>
    </form>
  );
}