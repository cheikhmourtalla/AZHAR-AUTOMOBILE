import { useState, useEffect, useCallback } from "react";
import { reservationsApi } from "../services/api";
import type { Reservation } from "../types/car";

export function useReservations(isAuthenticated: boolean) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (!isAuthenticated) {
      setReservations([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await reservationsApi.getMy();
      // Mapper le format backend vers le format frontend
      const mapped: Reservation[] = data.map((r: any) => ({
        id: r.id,
        carId: r.carId,
        carName: r.car?.name ?? "",
        carImage: r.car?.imageUrl ?? "",
        customerName: r.user?.name ?? "",
        phone: r.user?.phone ?? "",
        startDate: r.startDate,
        endDate: r.endDate,
        totalPrice: Number(r.totalPrice),
        status: r.status,
        createdAt: r.createdAt,
      }));
      setReservations(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const addReservation = async (data: {
    carId: number;
    startDate: string;
    endDate: string;
    notes?: string;
  }) => {
    const created = await reservationsApi.create(data);
    await fetchReservations(); // Recharger depuis l'API
    return created;
  };

  const deleteReservation = async (id: number) => {
    await reservationsApi.cancel(id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return { reservations, loading, error, addReservation, deleteReservation, refetch: fetchReservations };
}