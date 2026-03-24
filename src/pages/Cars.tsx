import { useEffect, useMemo, useState } from "react";
import CarCard from "../components/CarCard";
import Modal from "../components/Modal";
import ReservationForm from "../components/ReservationForm";
import PaymentModal from "../components/PaymentModal";
import { carsData } from "../data/cars";
import type {
  Car,
  PaymentMethod,
  Reservation,
} from "../types/car";

type CarsPageProps = {
  onAddReservation: (reservation: Reservation) => void;
};

type PendingReservation = Omit<
  Reservation,
  "id" | "paymentMethod" | "paymentStatus"
>;

export default function Cars({ onAddReservation }: CarsPageProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [reservationCar, setReservationCar] = useState<Car | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("wave");
  const [pendingReservation, setPendingReservation] =
    useState<PendingReservation | null>(null);

  const whatsappNumber = "221782964386";

  useEffect(() => {
    setCars(carsData);
  }, []);

  const rentalCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      if (car.purpose !== "location") return false;

      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.category.toLowerCase().includes(search.toLowerCase());

      const matchesAvailability =
        filterAvailable === "all"
          ? true
          : filterAvailable === "available"
          ? car.available
          : !car.available;

      return matchesSearch && matchesAvailability;
    });

    if (sortPrice === "asc") {
      filtered = [...filtered].sort(
        (a, b) => (a.pricePerDay ?? 0) - (b.pricePerDay ?? 0)
      );
    }

    if (sortPrice === "desc") {
      filtered = [...filtered].sort(
        (a, b) => (b.pricePerDay ?? 0) - (a.pricePerDay ?? 0)
      );
    }

    return filtered;
  }, [cars, search, filterAvailable, sortPrice]);

  const saleCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      if (car.purpose !== "vente") return false;

      return (
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.category.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sortPrice === "asc") {
      filtered = [...filtered].sort(
        (a, b) => (a.salePrice ?? 0) - (b.salePrice ?? 0)
      );
    }

    if (sortPrice === "desc") {
      filtered = [...filtered].sort(
        (a, b) => (b.salePrice ?? 0) - (a.salePrice ?? 0)
      );
    }

    return filtered;
  }, [cars, search, sortPrice]);

  const handleContinueToPayment = (reservation: PendingReservation) => {
    setPendingReservation(reservation);
    setPaymentOpen(true);
  };

  const handlePaymentConfirm = () => {
    if (!pendingReservation) return;

    const finalReservation: Reservation = {
      id: Date.now(),
      ...pendingReservation,
      paymentMethod,
      paymentStatus: "paid",
    };

    onAddReservation(finalReservation);

    const paymentLabel =
      paymentMethod === "wave" ? "Wave" : "Orange Money";

    const message = encodeURIComponent(
      `Bonjour, nouvelle réservation effectuée :

Client : ${finalReservation.customerName}
Téléphone : ${finalReservation.phone}
Voiture : ${finalReservation.carName}
Date début : ${finalReservation.startDate}
Date fin : ${finalReservation.endDate}
Montant total : ${finalReservation.totalPrice.toLocaleString()} FCFA
Mode de paiement : ${paymentLabel}
Statut : Paiement simulé réussi`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    setPaymentOpen(false);
    setReservationCar(null);
    setPendingReservation(null);
    setConfirmOpen(true);
  };

  const handleWhatsAppContact = (car: Car) => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par la voiture ${car.name}.

Marque : ${car.brand}
Catégorie : ${car.category}
Prix : ${car.salePrice?.toLocaleString()} FCFA

Pouvez-vous me donner plus d'informations ?`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
          Nos véhicules
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Découvrez nos voitures disponibles en location ainsi que nos véhicules
          proposés à la vente.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl bg-white p-4 shadow sm:p-5 md:grid-cols-3">
        <input
          type="text"
          placeholder="Rechercher une voiture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
        />

        <select
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="all">Toutes les disponibilités location</option>
          <option value="available">Disponibles</option>
          <option value="unavailable">Indisponibles</option>
        </select>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="default">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      <div className="space-y-14 sm:space-y-16">
        <div>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Voitures en location
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Réservez un véhicule adapté à vos déplacements.
              </p>
            </div>

            <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              {rentalCars.length} véhicule{rentalCars.length > 1 ? "s" : ""}
            </span>
          </div>

          {rentalCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {rentalCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={setSelectedCar}
                  onReserve={setReservationCar}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center shadow">
              <p className="text-gray-500">
                Aucune voiture trouvée en location.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Voitures en vente
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Retrouvez nos véhicules actuellement proposés à la vente.
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
              {saleCars.length} voiture{saleCars.length > 1 ? "s" : ""}
            </span>
          </div>

          {saleCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {saleCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={setSelectedCar}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center shadow">
              <p className="text-gray-500">
                Aucune voiture trouvée à la vente.
              </p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={selectedCar !== null}
        title="Détails de la voiture"
        onClose={() => setSelectedCar(null)}
      >
        {selectedCar && (
          <div className="space-y-4">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="h-56 w-full rounded-2xl object-cover sm:h-72"
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                  {selectedCar.name}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  {selectedCar.brand} • {selectedCar.category}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                  selectedCar.purpose === "location"
                    ? selectedCar.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {selectedCar.purpose === "location"
                  ? selectedCar.available
                    ? "Disponible"
                    : "Indisponible"
                  : "En vente"}
              </span>
            </div>

            <p className="text-sm text-gray-700 sm:text-base">
              {selectedCar.description}
            </p>

            <div className="grid gap-3 rounded-xl bg-gray-100 p-4 sm:grid-cols-2">
              <p>Places : {selectedCar.seats}</p>
              <p>Transmission : {selectedCar.transmission}</p>
              <p>Carburant : {selectedCar.fuel}</p>
              <p>Catégorie : {selectedCar.category}</p>

              <p className="font-bold text-orange-600 sm:col-span-2">
                {selectedCar.purpose === "location"
                  ? `${selectedCar.pricePerDay?.toLocaleString()} FCFA / jour`
                  : `${selectedCar.salePrice?.toLocaleString()} FCFA`}
              </p>
            </div>

            {selectedCar.purpose === "location" ? (
              <button
                onClick={() => {
                  setSelectedCar(null);
                  setReservationCar(selectedCar);
                }}
                disabled={!selectedCar.available}
                className={`w-full rounded-xl px-4 py-3 font-semibold text-white ${
                  selectedCar.available
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                Réserver cette voiture
              </button>
            ) : (
              <button
                onClick={() => handleWhatsAppContact(selectedCar)}
                className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
              >
                Contacter sur WhatsApp
              </button>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={reservationCar !== null}
        title="Formulaire de réservation"
        onClose={() => setReservationCar(null)}
      >
        {reservationCar && (
          <ReservationForm
            car={reservationCar}
            onContinueToPayment={handleContinueToPayment}
            onClose={() => setReservationCar(null)}
          />
        )}
      </Modal>

      <PaymentModal
        isOpen={paymentOpen}
        amount={pendingReservation?.totalPrice ?? 0}
        selectedMethod={paymentMethod}
        onChangeMethod={setPaymentMethod}
        onConfirm={handlePaymentConfirm}
        onClose={() => setPaymentOpen(false)}
      />

      <Modal
        isOpen={confirmOpen}
        title="Confirmation"
        onClose={() => setConfirmOpen(false)}
      >
        <div className="text-center">
          <div className="mb-4 text-5xl">✅</div>
          <p className="mb-2 text-base font-medium text-gray-700 sm:text-lg">
            Votre réservation a été enregistrée avec succès.
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Paiement simulé validé avec{" "}
            {paymentMethod === "wave" ? "Wave" : "Orange Money"}.
          </p>
          <button
            onClick={() => setConfirmOpen(false)}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            OK
          </button>
        </div>
      </Modal>
    </section>
  );
}