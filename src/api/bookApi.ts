import type { Book } from "../types/book";
import { api } from "./api";

export const bookApi = {
  getAll: async (): Promise<Book[]> => {
    const res = await api.get("/books/all");
    return res.data;
  },

  create: async (data: FormData): Promise<Book> => {
    const res = await api.post("/books/new", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};