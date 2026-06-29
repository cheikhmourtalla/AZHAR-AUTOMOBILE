// Couche centrale qui gère tous les appels vers le backend NestJS

const API_URL = (process.env.REACT_APP_API_URL as string) || "http://localhost:3000/api";

// Récupère le token JWT depuis le localStorage
function getToken(): string | null {
  return localStorage.getItem("alazhar_token");
}

// Construction des headers avec ou sans token
function buildHeaders(withAuth = true): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Gestion centralisée des réponses
async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data?.message
        ? Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message
        : `Erreur ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────
export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: buildHeaders(false),
      body: JSON.stringify(data),
    });
    return handleResponse<{ access_token: string; user: any }>(res);
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: buildHeaders(false),
      body: JSON.stringify(data),
    });
    return handleResponse<{ access_token: string; user: any }>(res);
  },
};

// ─────────────────────────────────────────
// CARS
// ─────────────────────────────────────────
export const carsApi = {
  getAll: async (filters?: {
    purpose?: string;
    category?: string;
    available?: boolean;
  }) => {
    const params = new URLSearchParams();
    if (filters?.purpose) params.append("purpose", filters.purpose);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.available !== undefined)
      params.append("available", String(filters.available));

    const res = await fetch(`${API_URL}/cars?${params}`, {
      headers: buildHeaders(false),
    });
    return handleResponse<any[]>(res);
  },

  getOne: async (id: number) => {
    const res = await fetch(`${API_URL}/cars/${id}`, {
      headers: buildHeaders(false),
    });
    return handleResponse<any>(res);
  },
};

// ─────────────────────────────────────────
// RESERVATIONS
// ─────────────────────────────────────────
export const reservationsApi = {
  create: async (data: {
    carId: number;
    startDate: string;
    endDate: string;
    notes?: string;
  }) => {
    const res = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  getMy: async () => {
    const res = await fetch(`${API_URL}/reservations/my`, {
      headers: buildHeaders(),
    });
    return handleResponse<any[]>(res);
  },

  cancel: async (id: number) => {
    const res = await fetch(`${API_URL}/reservations/${id}/cancel`, {
      method: "PATCH",
      headers: buildHeaders(),
    });
    return handleResponse<any>(res);
  },
};

// ─────────────────────────────────────────
// USERS
// ─────────────────────────────────────────
export const usersApi = {
  getMe: async () => {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: buildHeaders(),
    });
    return handleResponse<any>(res);
  },

  updateMe: async (data: { name?: string; phone?: string }) => {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },
};

// ─────────────────────────────────────────
// WEATHER
// ─────────────────────────────────────────
export const weatherApi = {
  get: async (city = "Dakar") => {
    const res = await fetch(`${API_URL}/weather?city=${city}`, {
      headers: buildHeaders(),
    });
    return handleResponse<any>(res);
  },
};