import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import Modal from "../components/Modal";
import { carsData } from "../data/cars";
import { formatFCFA } from "../utils/validation";
import { WHATSAPP_NUMBER } from "../config/constants";
import type { Car } from "../types/car";

type CarsPageProps = {
  onAddReservation: (data: { carId: number; startDate: string; endDate: string; notes?: string }) => Promise<any>;
  onLoginRequired: () => void;
  isAuthenticated: boolean;
};

export default function Cars({ onAddReservation, onLoginRequired, isAuthenticated }: CarsPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const rentalCars = useMemo(() => {
    let list = carsData.filter((car) => {
      if (car.purpose !== "location") return false;
      const q = search.toLowerCase();
      const match =
        car.name.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.category.toLowerCase().includes(q);
      const avail =
        filterAvailable === "all" ? true
        : filterAvailable === "available" ? car.available
        : !car.available;
      return match && avail;
    });
    if (sortPrice === "asc") list = [...list].sort((a, b) => (a.pricePerDay ?? 0) - (b.pricePerDay ?? 0));
    if (sortPrice === "desc") list = [...list].sort((a, b) => (b.pricePerDay ?? 0) - (a.pricePerDay ?? 0));
    return list;
  }, [search, filterAvailable, sortPrice]);

  const saleCars = useMemo(() => {
    let list = carsData.filter((car) => {
      if (car.purpose !== "vente") return false;
      const q = search.toLowerCase();
      return car.name.toLowerCase().includes(q) || car.brand.toLowerCase().includes(q) || car.category.toLowerCase().includes(q);
    });
    if (sortPrice === "asc") list = [...list].sort((a, b) => (a.salePrice ?? 0) - (b.salePrice ?? 0));
    if (sortPrice === "desc") list = [...list].sort((a, b) => (b.salePrice ?? 0) - (a.salePrice ?? 0));
    return list;
  }, [search, sortPrice]);

  const handleReserveClick = (car: Car) => {
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }
    navigate(`/reserver/${car.id}`);
  };

  const handleWhatsAppContact = (car: Car) => {
    const msg = encodeURIComponent(
      `Bonjour, je suis intéressé par la voiture ${car.name}.\n\nMarque : ${car.brand}\nCatégorie : ${car.category}\nPrix : ${car.salePrice?.toLocaleString()} FCFA\n\nPouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Notre flotte</p>
        <h1 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">Nos véhicules</h1>
        <p className="mt-2 text-sm text-gray-500">Location à la journée · Achat direct · Paiement via WhatsApp</p>
      </div>

      {/* Filtres */}
      <div className="mb-8 grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 md:grid-cols-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher un véhicule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <select
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          <option value="all">Toutes les disponibilités</option>
          <option value="available">Disponibles seulement</option>
          <option value="unavailable">Indisponibles</option>
        </select>
        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          <option value="default">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      <div className="space-y-16">
        {/* Location */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Voitures en location</h2>
              <p className="mt-1 text-sm text-gray-500">Réservez en ligne, payez avec l'équipe.</p>
            </div>
            <span className="rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
              {rentalCars.length} véhicule{rentalCars.length > 1 ? "s" : ""}
            </span>
          </div>

          {rentalCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rentalCars.map((car) => (
                <CarCard key={car.id} car={car} onViewDetails={setSelectedCar} onReserve={handleReserveClick} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <p className="text-gray-400">Aucun résultat pour cette recherche.</p>
            </div>
          )}
        </div>

        {/* Vente */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Voitures en vente</h2>
              <p className="mt-1 text-sm text-gray-500">Contactez-nous sur WhatsApp pour finaliser l'achat.</p>
            </div>
            <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600">
              {saleCars.length} voiture{saleCars.length > 1 ? "s" : ""}
            </span>
          </div>

          {saleCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {saleCars.map((car) => (
                <CarCard key={car.id} car={car} onViewDetails={setSelectedCar} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <p className="text-gray-400">Aucun résultat pour cette recherche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails */}
      <Modal isOpen={selectedCar !== null} title="Détails du véhicule" onClose={() => setSelectedCar(null)}>
        {selectedCar && (
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={selectedCar.image} alt={selectedCar.name} className="h-56 w-full object-cover sm:h-64" />
              <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${
                selectedCar.purpose === "location"
                  ? selectedCar.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  : "bg-blue-600 text-white"
              }`}>
                {selectedCar.purpose === "location" ? (selectedCar.available ? "Disponible" : "Indisponible") : "En vente"}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{selectedCar.name}</h3>
              <p className="text-sm text-gray-500">{selectedCar.brand} · {selectedCar.category}</p>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">{selectedCar.description}</p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: "👥", label: `${selectedCar.seats} places` },
                { icon: "⚙️", label: selectedCar.transmission },
                { icon: "⛽", label: selectedCar.fuel },
                {
                  icon: "🏷️",
                  label: selectedCar.purpose === "location"
                    ? `${formatFCFA(selectedCar.pricePerDay ?? 0)} / jour`
                    : formatFCFA(selectedCar.salePrice ?? 0),
                  bold: true,
                },
              ].map(({ icon, label, bold }) => (
                <div key={label} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${bold ? "bg-orange-50 font-bold text-orange-600" : "bg-gray-50 text-gray-700"}`}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

            {selectedCar.purpose === "location" ? (
              <button
                onClick={() => { setSelectedCar(null); handleReserveClick(selectedCar); }}
                disabled={!selectedCar.available}
                className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition active:scale-[.98] ${
                  selectedCar.available ? "bg-orange-500 hover:bg-orange-600" : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {selectedCar.available ? "Faire une demande de réservation" : "Indisponible pour le moment"}
              </button>
            ) : (
              <button
                onClick={() => handleWhatsAppContact(selectedCar)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contacter sur WhatsApp
              </button>
            )}
          </div>
        )}
      </Modal>

    </section>
  );
}