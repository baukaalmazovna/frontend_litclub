// src/store/useGenreStore.ts
import { create } from "zustand";
import { genreApi } from "../api/genreApi";
import type { Genre } from "../types/genre";

interface GenreState {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
  fetchGenres: () => Promise<void>;
}

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  isLoading: false,
  error: null,

  fetchGenres: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await genreApi.getAll();
      set({ genres: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Ошибка загрузки жанров",
        isLoading: false,
      });
    }
  },
}));