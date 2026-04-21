import type { Book } from "../types/book";
import { api } from "./api";

export const bookApi = {
  getAll: async (): Promise<Book[]> => {
    const res = await api.get("/books/all");
    return res.data;
  },

  getById: async (id: number): Promise<Book> => {
    const res = await api.get(`/books/${id}`);
    return res.data;
  },

  create: async (data: FormData): Promise<Book> => {
    const res = await api.post("/books/new", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: number, data: Partial<Book>): Promise<Book> => {
    const res = await api.put(`/books/update?book_id=${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/delete?book_id=${id}`);
  },
};