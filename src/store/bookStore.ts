import { create } from "zustand";
import { bookApi } from "../api/bookApi";
import type { Book } from "../types/book";

interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  fetchBookById: (id: number) => Promise<Book>;
  createBook: (data: FormData) => Promise<Book>;
  updateBook: (id: number, data: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  setBooks: (books: Book[]) => void;
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  isLoading: false,
  error: null,

  fetchBooks: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await bookApi.getAll();
      set({ books: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Ошибка загрузки", isLoading: false });
    }
  },

  fetchBookById: async (id: number) => {
    const data = await bookApi.getById(id);
    return data;
  },

  createBook: async (formData: FormData) => {
    const data = await bookApi.create(formData);
    set({ books: [...get().books, data] });
    return data;
  },

  updateBook: async (id: number, bookData: Partial<Book>) => {
    const updated = await bookApi.update(id, bookData);
    set({
      books: get().books.map((b) => (b.id === id ? updated : b)),
    });
  },

  deleteBook: async (id: number) => {
    await bookApi.delete(id);
    set({ books: get().books.filter((b) => b.id !== id) });
  },

  setBooks: (books: Book[]) => set({ books }),
}));