import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <div className="bg-white rounded-xl border p-4">
      <img src={book.book_avatar} className="" />

      <h3 className="font-semibold">{book.title}</h3>

      <p className="text-sm text-gray-500">
        {book.authors?.[0]?.first_name} {book.authors?.[0]?.last_name}
      </p>

      <p className="text-xs text-gray-400">{book.genres?.[0]?.name}</p>

      {book.year && (
        <p className="text-xs text-gray-400">{book.year}</p>
      )}
    </div>
  );
};