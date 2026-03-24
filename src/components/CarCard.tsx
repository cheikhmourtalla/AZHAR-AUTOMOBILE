import type { Car } from "../types/car";

type CarCardProps = {
  car: Car;
  onViewDetails: (car: Car) => void;
  onReserve?: (car: Car) => void;
};

export default function CarCard({
  car,
  onViewDetails,
  onReserve,
}: CarCardProps) {
  const isLocation = car.purpose === "location";
  const isSale = car.purpose === "vente";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={car.image}
        alt={car.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
            <p className="text-sm text-gray-500">
              {car.brand} • {car.category}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isLocation
                ? car.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isLocation
              ? car.available
                ? "Disponible"
                : "Indisponible"
              : "En vente"}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {car.description}
        </p>

        <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
          <p>Places : {car.seats}</p>
          <p>Boîte : {car.transmission}</p>
          <p>Carburant : {car.fuel}</p>
          <p className="font-semibold text-orange-600">
            {isLocation && car.pricePerDay
              ? `${car.pricePerDay.toLocaleString()} FCFA/jour`
              : `${car.salePrice?.toLocaleString()} FCFA`}
          </p>
        </div>

        {/* ✅ LOGIQUE CORRIGÉE */}
        {isLocation ? (
          <div className="flex gap-3">
            <button
              onClick={() => onViewDetails(car)}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Détails
            </button>

            <button
              onClick={() => onReserve?.(car)}
              disabled={!car.available}
              className={`flex-1 rounded-xl px-4 py-2 font-medium text-white ${
                car.available
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              Réserver
            </button>
          </div>
        ) : (
          <button
            onClick={() => onViewDetails(car)}
            className="w-full rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
}