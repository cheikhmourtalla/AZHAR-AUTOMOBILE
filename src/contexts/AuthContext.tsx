import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authApi } from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "client";
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurer la session depuis localStorage au chargement
  useEffect(() => {
    const savedToken = localStorage.getItem("alazhar_token");
    const savedUser = localStorage.getItem("alazhar_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("alazhar_token");
        localStorage.removeItem("alazhar_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem("alazhar_token", res.access_token);
    localStorage.setItem("alazhar_user", JSON.stringify(res.user));
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string }) => {
    const res = await authApi.register(data);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem("alazhar_token", res.access_token);
    localStorage.setItem("alazhar_user", JSON.stringify(res.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("alazhar_token");
    localStorage.removeItem("alazhar_user");
    localStorage.removeItem("alazhar_reservations");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}