import type { Car } from "../types/car";
import { formatFCFA } from "../utils/validation";

type CarCardProps = {
  car: Car;
  onViewDetails: (car: Car) => void;
  onReserve?: (car: Car) => void;
};

export default function CarCard({ car, onViewDetails, onReserve }: CarCardProps) {
  const isLocation = car.purpose === "location";

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
          loading="lazy"
        />
        {/* Badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            isLocation
              ? car.available
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {isLocation ? (car.available ? "Disponible" : "Indisponible") : "En vente"}
        </span>
        {/* Category chip */}
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {car.category}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Title */}
        <div className="mb-3">
          <h3 className="truncate text-lg font-bold text-gray-800 sm:text-xl">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.brand}</p>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed">{car.description}</p>

        {/* Specs grid */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
            <span>👥</span> {car.seats} places
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
            <span>⚙️</span> {car.transmission}
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
            <span>⛽</span> {car.fuel}
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-semibold text-orange-600">
            {isLocation && car.pricePerDay
              ? `${formatFCFA(car.pricePerDay)}/j`
              : formatFCFA(car.salePrice ?? 0)}
          </div>
        </div>

        {/* Actions */}
        {isLocation ? (
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(car)}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
            >
              Détails
            </button>
            <button
              onClick={() => onReserve?.(car)}
              disabled={!car.available}
              aria-label={`Réserver ${car.name}`}
              className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition active:scale-[.98] ${
                car.available
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Réserver
            </button>
          </div>
        ) : (
          <button
            onClick={() => onViewDetails(car)}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[.98]"
          >
            Voir les détails
          </button>
        )}
      </div>
    </article>
  );
}