import { create } from "zustand";
import { api } from "../api/api";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      const { access_token, user } = res.data;

      // 💾 сохраняем
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token: access_token,
        user,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Ошибка входа");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));
