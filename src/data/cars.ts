import type { Car } from "../types/car";
import tucson from "../assets/tucson.png"
import picanto from "../assets/picanto.jpg"
import hiace from "../assets/hiace.jpg"
import hilux from "../assets/hilux.jpg"
import classec from "../assets/classec.jpg"
import bmw from "../assets/bmw.jpg"
import corolla from "../assets/corolla.png"
import fortuner from "../assets/fortuner.jpg"
import hyundai from "../assets/hyundai.jpg"
import renault from "../assets/renault.jpg"
import peugeot from "../assets/peugeot.jpg"
import classeg from "../assets/classeg.jpg"
import nissan from "../assets/nissan.jpg"
import fusion from "../assets/fusion.jpg"
import grandeur from "../assets/grandeur.jpg"



export const carsData: Car[] = [
  {
    id: 2,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    category: "SUV",
    purpose: "location",
    pricePerDay: 50000,
    seats: 5,
    transmission: "Automatique",
    fuel: "Essence",
    image:tucson,
    available: true,
    description:
      "SUV moderne, élégant et économique, parfait pour la ville et les déplacements réguliers.",
  },
  {
    id: 3,
    name: "Kia Picanto",
    brand: "Kia",
    category: "Citadine",
    purpose: "location",
    pricePerDay: 25000,
    seats: 4,
    transmission: "Manuelle",
    fuel: "Essence",
    image:picanto,
    available: true,
    description:
      "Petite voiture pratique, économique et facile à conduire en milieu urbain.",
  },
  {
    id: 4,
    name: "Toyota Hiace",
    brand: "Toyota",
    category: "Utilitaire",
    purpose: "location",
    pricePerDay: 90000,
    seats: 15,
    transmission: "Manuelle",
    fuel: "Diesel",
    image:hiace,
    available: true,
    description:
      "Véhicule idéal pour le transport de bagages, groupes et marchandises.",
  },
  {
    id: 5,
    name: "Toyota Hilux",
    brand: "Toyota",
    category: "Utilitaire",
    purpose: "location",
    pricePerDay: 70000,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    image:hilux,
    available: true,
    description:
      "Pick-up robuste adapté au transport de matériel, bagages et marchandises.",
  },
  {
    id: 6,
    name: "Mercedes Classe C",
    brand: "Mercedes-Benz",
    category: "Berline",
    purpose: "location",
    pricePerDay: 70000,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    image:classec,
    available: false,
    description:
      "Berline premium avec excellent confort pour une clientèle exigeante.",
  },

  {
    id: 7,
    name: "Toyota Corolla 2020",
    brand: "Toyota",
    category: "Berline",
    purpose: "vente",
    salePrice: 11500000,
    seats: 5,
    transmission: "Automatique",
    fuel: "Essence",
    image:corolla,
    available: true,
    description:
      "Berline fiable, sobre et élégante, idéale pour un usage personnel ou professionnel.",
  },
  {
    id: 8,
    name: "Hyundai Grand i10",
    brand: "Hyundai",
    category: "Citadine",
    purpose: "vente",
    salePrice: 6500000,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    image:hyundai,
    available: true,
    description:
      "Citadine moderne, économique et adaptée à la conduite en ville.",
  },
  {
    id: 9,
    name: "Toyota Fortuner",
    brand: "Toyota",
    category: "SUV",
    purpose: "vente",
    salePrice: 24500000,
    seats: 7,
    transmission: "Automatique",
    fuel: "Diesel",
    image:fortuner,
    available: true,
    description:
      "SUV robuste et spacieux, parfait pour les familles et les longs trajets.",
  },
  {
    id: 10,
    name: "Peugeot 301",
    brand: "Peugeot",
    category: "Berline",
    purpose: "vente",
    salePrice: 7800000,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    image:peugeot,
    available: true,
    description:
      "Voiture simple, confortable et pratique pour les trajets quotidiens.",
  },
  {
    id: 11,
    name: "BMW X5",
    brand: "BMW",
    category: "Luxe",
    purpose: "vente",
    salePrice: 32000000,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    image:bmw,
    available: true,
    description:
      "SUV haut de gamme destiné à une clientèle recherchant confort et prestige.",
  },
  {
    id: 12,
    name: "Renault Master",
    brand: "Renault",
    category: "Utilitaire",
    purpose: "vente",
    salePrice: 18500000,
    seats: 3,
    transmission: "Manuelle",
    fuel: "Diesel",
    image:renault,
    available: true,
    description:
      "Grand utilitaire pour activité professionnelle, transport ou logistique.",
  },
  {
  id: 13,
  name: "Mercedes Classe G",
  brand: "Mercedes-Benz",
  category: "Luxe",
  purpose: "vente",
  salePrice: 48500000,
  seats: 5,
  transmission: "Automatique",
  fuel: "Essence",
  image:classeg,
  available: true,
  description:
    "SUV de luxe puissant et prestigieux, idéal pour une clientèle recherchant confort, élégance et performance.",
},
{
  id: 14,
  name: "Hyundai Grandeur",
  brand: "Hyundai",
  category: "Berline",
  purpose: "vente",
  salePrice: 13800000,
  seats: 5,
  transmission: "Automatique",
  fuel: "Essence",
  image:grandeur,
  available: true,
  description:
    "Grande berline élégante et confortable, parfaite pour les déplacements haut de gamme et les longues distances.",
},
{
  id: 15,
  name: "Ford Fusion",
  brand: "Ford",
  category: "Berline",
  purpose: "location",
  pricePerDay: 42000,
  seats: 5,
  transmission: "Automatique",
  fuel: "Essence",
  image:fusion,
  available: true,
  description:
    "Berline moderne et confortable, adaptée aux trajets urbains et interurbains avec une bonne tenue de route.",
},
{
  id: 16,
  name: "Nissan Sunny",
  brand: "Nissan",
  category: "Berline",
  purpose: "location",
  pricePerDay: 35000,
  seats: 5,
  transmission: "Automatique",
  fuel: "Essence",
  image:nissan,
  available: true,
  description:
    "Voiture fiable, économique et pratique pour la location, idéale pour les déplacements quotidiens.",
},
];