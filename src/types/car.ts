export type CarPurpose = "location" | "vente";

export type ReservationStatus = "en_attente" | "confirmee" | "annulee";

export type Car = {
  id: number;
  name: string;
  brand: string;
  category: string;
  purpose: CarPurpose;
  pricePerDay?: number;
  salePrice?: number;
  seats: number;
  transmission: string;
  fuel: string;
  image: string;
  available: boolean;
  description: string;
};

export type Reservation = {
  id: number;
  carId: number;
  carName: string;
  carImage?: string;
  customerName: string;
  phone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
};