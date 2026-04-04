import type { Author } from "./author";
import type { Genre } from "./genre";

export interface Book {
  id: number;
  title: string;
  description?: string;
  year?: number;
  authors: Author[];
  genres: Genre[];
  book_avatar: string;
}
