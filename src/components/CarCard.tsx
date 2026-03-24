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

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={car.image}
        alt={car.name}
        className="h-48 w-full object-cover sm:h-56"
      />

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-gray-800 sm:text-xl">
              {car.name}
            </h3>
            <p className="text-sm text-gray-500">
              {car.brand} • {car.category}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
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

        {isLocation ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onViewDetails(car)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Détails
            </button>

            <button
              onClick={() => onReserve?.(car)}
              disabled={!car.available}
              className={`w-full rounded-xl px-4 py-2 font-medium text-white transition ${
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
            className="w-full rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
          >
            Voir plus
          </button>
        )}
      </div>
    </div>
  );
}