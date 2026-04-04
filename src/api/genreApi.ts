// src/api/genreApi.ts
import type { Genre } from "../types/genre";
import { api } from "./api";

export const genreApi = {
  getAll: async (): Promise<Genre[]> => {
    const res = await api.get("/genres/all");
    return res.data;
  },
};