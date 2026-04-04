import { useState } from "react";
import type { Book } from "../../../../types/book";
import { CreateBookModal } from "../create/CreateBookModal";

type Props = {
    books: Book[];
};

export const BooksList = ({ books }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">

            {/* Заголовок */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Books</h1>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md text-sm hover:bg-white transition"
                >
                    + Добавить книгу
                </button>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto bg-gray-900/60 border border-gray-700 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-900 border-b border-gray-700 text-gray-400">
                        <tr>
                            <th className="text-left px-4 py-3">Обложка</th>
                            <th className="text-left px-4 py-3">Название</th>
                            <th className="text-left px-4 py-3">Автор</th>
                            <th className="text-left px-4 py-3">Жанр</th>
                            <th className="text-left px-4 py-3">Год</th>
                            <th className="text-right px-4 py-3">Действия</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                            >
                                {/* Обложка */}
                                <td className="px-4 py-3">
                                    <img
                                        src={`http://localhost:8000${book.book_avatar}` || "/placeholder.png"}
                                        alt={book.title}
                                        className="w-10 h-14 object-cover rounded"
                                    />
                                </td>

                                {/* Название */}
                                <td className="px-4 py-3 text-white font-medium">
                                    {book.title}
                                </td>

                                {/* Автор */}
                                <td>{book.authors?.map(a => `${a.first_name} ${a.last_name}`).join(", ")}</td>
                                
                                <td>{book.genres?.map(g => g.name).join(", ")}</td>

                                {/* Год */}
                                <td className="px-4 py-3 text-gray-400">
                                    {book.year || "-"}
                                </td>

                                {/* Действия */}
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-3">

                                        {/* Edit */}
                                        <button className="text-blue-400 hover:text-blue-300 transition">
                                            ✏️
                                        </button>

                                        {/* Delete */}
                                        <button className="text-red-400 hover:text-red-300 transition">
                                            🗑️
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Если пусто */}
                {books.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Нет книг
                    </div>
                )}
            </div>

            {/* Модалка */}
            <CreateBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
