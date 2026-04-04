// src/store/useGenreStore.ts
import { create } from "zustand";
import type { Genre } from "../types/genre";
import { publisherApi } from "../api/publisherApi";

interface PublisherState {
  publishers: Genre[];
  isLoading: boolean;
  error: string | null;
  fetchPublishers: () => Promise<void>;
}

export const usePublisherStore = create<PublisherState>((set) => ({
  publishers: [],
  isLoading: false,
  error: null,

  fetchPublishers: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await publisherApi.getAll();
      set({ publishers: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Ошибка загрузки издателей",
        isLoading: false,
      });
    }
  },
}));