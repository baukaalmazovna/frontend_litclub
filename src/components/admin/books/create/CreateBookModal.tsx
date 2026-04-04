import { useEffect, useState } from "react";
import { useGenreStore } from "../../../../store/genreStore";
import { usePublisherStore } from "../../../../store/publisherStore";
import { useAuthorStore } from "../../../../store/authorStore";
import { useBookStore } from "../../../../store/bookStore";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateBookModal = ({ isOpen, onClose }: Props) => {
    const bookStore = useBookStore();

    const [form, setForm] = useState({
        title: "",
        description: "",
        year: "",
        author_ids: [] as number[],
        publisher_id: "",
        genre_ids: [] as number[],
        book_file: null as File | null,
        book_preview: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // 🔹 новое состояние

    const { genres, isLoading: isGenresLoading, error: genresError, fetchGenres } = useGenreStore();
    const { publishers, isLoading: isPublishersLoading, error: publishersError, fetchPublishers } = usePublisherStore();
    const { authors, isLoading: isAuthorsLoading, error: authorsError, fetchAuthors } = useAuthorStore();

    useEffect(() => { fetchGenres(); }, [fetchGenres]);
    useEffect(() => { fetchPublishers(); }, [fetchPublishers]);
    useEffect(() => { fetchAuthors(); }, [fetchAuthors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setForm({ ...form, book_file: file, book_preview: URL.createObjectURL(file) });
    };

    const handleAddGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value);
        if (id && !form.genre_ids.includes(id)) {
            setForm({ ...form, genre_ids: [...form.genre_ids, id] });
        }
        e.target.value = "";
    };

    const handleRemoveGenre = (id: number) => {
        setForm({ ...form, genre_ids: form.genre_ids.filter(g => g !== id) });
    };

    const handleAddAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value);
        if (id && !form.author_ids.includes(id)) {
            setForm({ ...form, author_ids: [...form.author_ids, id] });
        }
        e.target.value = "";
    };

    const handleRemoveAuthor = (id: number) => {
        setForm({ ...form, author_ids: form.author_ids.filter(a => a !== id) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            if (form.description) formData.append("description", form.description);

            // 🔹 Отправка только года как integer
            if (form.year) {
                const yearInt = parseInt(form.year, 10);
                formData.append("year", yearInt.toString());
            }

            if (form.publisher_id) formData.append("publisher_id", form.publisher_id);
            form.author_ids.forEach(id => formData.append("author_ids", id.toString()));
            form.genre_ids.forEach(id => formData.append("genre_ids", id.toString()));
            if (form.book_file) formData.append("book_file", form.book_file);

            await bookStore.createBook(formData);

            // const newBook = await bookStore.createBook(formData);

            // // 🔹 сразу добавляем её в локальный список
            // bookStore.setBooks([...bookStore.books, newBook]);

            await bookStore.fetchBooks();

            // 🔹 Показываем сообщение и закрываем через 2 секунды
            setSuccessMessage("Книга успешно добавлена!");
            setTimeout(() => {
                setSuccessMessage("");
                onClose();
            }, 2000);

            // 🔹 Сброс формы
            setForm({
                title: "",
                description: "",
                year: "",
                author_ids: [],
                publisher_id: "",
                genre_ids: [],
                book_file: null,
                book_preview: "",
            });
        } catch (err) {
            console.error("Ошибка при создании книги:", err);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`fixed inset-0 flex items-center justify-center px-4 transition-all duration-300 overflow-auto ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 space-y-5 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* 🔹 Сообщение успеха */}
                    {successMessage && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                            {successMessage}
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Добавить книгу</h2>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">✖</button>
                    </div>

                    <div className="space-y-4">
                        <input name="title" placeholder="Название" value={form.title} onChange={handleChange} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md" />

                        {/* Авторы */}
                        <div className="flex flex-wrap gap-2 mb-1">
                            {form.author_ids.map(id => {
                                const author = authors.find(a => a.id === id);
                                if (!author) return null;
                                return (
                                    <span key={id} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        {author.first_name} {author.last_name}
                                        <button type="button" onClick={() => handleRemoveAuthor(id)} className="ml-1 text-white font-bold text-xs">×</button>
                                    </span>
                                );
                            })}
                        </div>
                        <select onChange={handleAddAuthor} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md">
                            <option value="">Выберите автора</option>
                            {isAuthorsLoading && <option disabled>Загрузка...</option>}
                            {authorsError && <option disabled>Ошибка загрузки</option>}
                            {authors.map(author => <option key={author.id} value={author.id}>{author.first_name} {author.last_name}</option>)}
                        </select>

                        {/* Жанры */}
                        <div className="flex flex-wrap gap-2 mb-1">
                            {form.genre_ids.map(id => {
                                const genre = genres.find(g => g.id === id);
                                if (!genre) return null;
                                return (
                                    <span key={id} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        {genre.name}
                                        <button type="button" onClick={() => handleRemoveGenre(id)} className="ml-1 text-white font-bold text-xs">×</button>
                                    </span>
                                );
                            })}
                        </div>
                        <select onChange={handleAddGenre} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md">
                            <option value="">Выберите жанр</option>
                            {isGenresLoading && <option disabled>Загрузка...</option>}
                            {genresError && <option disabled>Ошибка загрузки</option>}
                            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                        </select>

                        {/* Паблишеры */}
                        <select name="publisher_id" value={form.publisher_id} onChange={handleChange} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md">
                            <option value="">Выберите издателя</option>
                            {isPublishersLoading && <option disabled>Загрузка...</option>}
                            {publishersError && <option disabled>Ошибка загрузки</option>}
                            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>

                        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md" />

                        <input type="date" name="year" placeholder="Год" value={form.year} onChange={handleChange} className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md" />

                        {/* Превью */}
                        {form.book_preview && (
                            <img src={form.book_preview} alt="Превью книги" className="w-32 h-40 object-cover rounded-md mb-2" />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Отмена</button>
                        <button type="submit" className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md text-sm hover:bg-white">Создать</button>
                    </div>
                </form>
            </div>
        </>
    );
};