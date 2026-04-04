// src/store/useGenreStore.ts
import { create } from "zustand";
import { authorApi } from "../api/authorApi";
import type { Author } from "../types/author";

interface AuthorState {
  authors: Author[];
  isLoading: boolean;
  error: string | null;
  fetchAuthors: () => Promise<void>;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  isLoading: false,
  error: null,

  fetchAuthors: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await authorApi.getAll();
      set({ authors: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Ошибка загрузки авторов",
        isLoading: false,
      });
    }
  },
}));