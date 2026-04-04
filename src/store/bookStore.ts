import { create } from "zustand";
import { bookApi } from "../api/bookApi";
import type { Book } from "../types/book";

interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  createBook: (data: FormData) => Promise<Book>;
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

  createBook: async (formData) => {
    const res = await fetch("http://localhost:8000/books/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // добавляем базовый URL для book_avatar, чтобы сразу рендерить на фронте
    data.book_avatar = `http://localhost:8000${data.book_avatar}`;
    // обновляем состояние сразу
    set({ books: [...get().books, data] });
    return data; // 🔹 возвращаем объект книги
  },

  setBooks: (books: Book[]) => set({ books }),
}));