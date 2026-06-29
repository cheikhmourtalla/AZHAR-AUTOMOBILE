import { useState } from "react";
import { Link } from "react-router-dom";
import type { Reservation, ReservationStatus } from "../types/car";
import { formatFCFA } from "../utils/validation";
import { WHATSAPP_URL } from "../config/constants";

type Props = {
  reservations: Reservation[];
  onDeleteReservation: (id: number) => Promise<void>;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
};

const statusConfig: Record<ReservationStatus, { label: string; color: string; dot: string }> = {
  en_attente: {
    label: "En attente de confirmation",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  confirmee: {
    label: "Confirmée",
    color: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  annulee: {
    label: "Annulée",
    color: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-400",
  },
};

function calcDaysLabel(start: string, end: string): string {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
  return `${days} jour${days > 1 ? "s" : ""}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Reservations({ reservations, onDeleteReservation, isAuthenticated, onLoginRequired }: Props) {
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const filtered = reservations.filter(
    (r) =>
      r.carName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Espace client</p>
          <h1 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">Mes réservations</h1>
          {reservations.length > 0 && (
            <p className="mt-1 text-sm text-gray-400">
              {reservations.length} réservation{reservations.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {reservations.length > 0 && (
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-64"
          />
        )}
      </div>

      {/* État non connecté */}
      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">🔒</div>
          <h2 className="text-lg font-bold text-gray-700">Connexion requise</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-400">Connectez-vous pour voir et gérer vos réservations.</p>
          <button
            onClick={onLoginRequired}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Se connecter
          </button>
        </div>
      )}

      {/* État vide */}
      {isAuthenticated && reservations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
            🚗
          </div>
          <h2 className="text-lg font-bold text-gray-700">Aucune réservation</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-400">
            Vos demandes de réservation apparaîtront ici une fois soumises.
          </p>
          <Link
            to="/cars"
            className="mt-6 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Voir les véhicules disponibles
          </Link>
        </div>
      )}

      {/* Résultats vides après recherche */}
      {isAuthenticated && reservations.length > 0 && filtered.length === 0 && (
        <div className="rounded-2xl bg-gray-50 p-10 text-center">
          <p className="text-gray-400">Aucune réservation ne correspond à votre recherche.</p>
        </div>
      )}

      {/* Liste */}
      {isAuthenticated && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((r) => {
            const st = statusConfig[r.status] ?? statusConfig["en_attente"];
            return (
              <article
                key={r.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Top bar */}
                <div className="flex items-center gap-3 border-b border-gray-50 bg-gray-50/60 px-5 py-3">
                  {r.carImage && (
                    <img src={r.carImage} alt={r.carName} className="h-10 w-14 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-bold text-gray-800">{r.carName}</h2>
                    <p className="text-xs text-gray-400">
                      Demande du {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${st.color}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>
                </div>

                {/* Corps */}
                <div className="grid gap-5 p-5 sm:grid-cols-3">
                  {/* Client */}
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Client</p>
                    <p className="font-semibold text-gray-800">{r.customerName}</p>
                    <p className="text-sm text-gray-500">{r.phone}</p>
                  </div>

                  {/* Période */}
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Période</p>
                    <p className="text-sm text-gray-700">
                      Du <span className="font-medium">{formatDate(r.startDate)}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                      au <span className="font-medium">{formatDate(r.endDate)}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{calcDaysLabel(r.startDate, r.endDate)}</p>
                  </div>

                  {/* Montant */}
                  <div>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Montant estimé</p>
                    <p className="text-2xl font-extrabold text-orange-600">{formatFCFA(r.totalPrice)}</p>
                    <p className="mt-1 text-xs text-gray-400">Paiement à confirmer avec l'équipe</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-gray-50 px-5 py-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-green-600 transition hover:bg-green-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contacter l'équipe
                  </a>
                  <button
                    onClick={() => setConfirmDeleteId(r.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Info paiement globale */}
      {isAuthenticated && reservations.length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
          <span className="mt-0.5 text-base">ℹ️</span>
          <p>
            Le paiement se fait directement avec notre équipe après confirmation de votre demande.
            Contactez-nous sur WhatsApp pour finaliser.{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">
              Écrire sur WhatsApp →
            </a>
          </p>
        </div>
      )}

      {/* Dialog confirmation suppression */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 text-center text-4xl">🗑️</div>
            <h3 className="mb-1 text-center text-lg font-bold text-gray-800">Supprimer cette réservation ?</h3>
            <p className="mb-6 text-center text-sm text-gray-500">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onDeleteReservation(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}