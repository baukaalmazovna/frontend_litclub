// src/api/genreApi.ts
import type { Author } from "../types/author";
import { api } from "./api";

export const authorApi = {
  getAll: async (): Promise<Author[]> => {
    const res = await api.get("/authors/all");
    return res.data;
  },
};