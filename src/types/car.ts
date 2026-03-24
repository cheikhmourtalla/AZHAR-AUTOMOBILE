export type CarPurpose = "location" | "vente";
export type PaymentMethod = "wave" | "orange-money";
export type PaymentStatus = "pending" | "paid";

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
  customerName: string;
  phone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};