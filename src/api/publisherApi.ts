// src/api/genreApi.ts
import type { Publisher } from "../types/publisher";
import { api } from "./api";

export const publisherApi = {
  getAll: async (): Promise<Publisher[]> => {
    const res = await api.get("/publishers/all");
    return res.data;
  },
};