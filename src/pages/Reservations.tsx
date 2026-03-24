import type { Reservation } from "../types/car";

type ReservationsPageProps = {
  reservations: Reservation[];
  onDeleteReservation: (id: number) => void;
};

export default function Reservations({
  reservations,
  onDeleteReservation,
}: ReservationsPageProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-800 sm:text-4xl">
        Mes réservations
      </h1>
      <p className="mb-8 text-sm text-gray-600 sm:text-base">
        Liste des réservations enregistrées dans l’application.
      </p>

      {reservations.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <p className="text-gray-500">Aucune réservation pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="rounded-2xl bg-white p-5 shadow sm:p-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                    {reservation.carName}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    Client : {reservation.customerName}
                  </p>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Téléphone : {reservation.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Début : {reservation.startDate}
                  </p>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Fin : {reservation.endDate}
                  </p>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Paiement :{" "}
                    {reservation.paymentMethod === "wave"
                      ? "Wave"
                      : "Orange Money"}
                  </p>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Statut :{" "}
                    {reservation.paymentStatus === "paid"
                      ? "Payé (simulation)"
                      : "En attente"}
                  </p>
                  <p className="mt-2 text-base font-bold text-orange-600 sm:text-lg">
                    Total : {reservation.totalPrice.toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => onDeleteReservation(reservation.id)}
                  className="w-full rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 sm:w-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}