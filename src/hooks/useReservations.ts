import { useEffect, useState } from "react";
import type { Reservation } from "../types/car";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const storedReservations = localStorage.getItem("reservations");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  const deleteReservation = (id: number) => {
    setReservations((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    reservations,
    addReservation,
    deleteReservation,
  };
}