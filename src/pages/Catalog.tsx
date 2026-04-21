import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Grid3X3, List, Star } from "lucide-react";
import { useGenreStore } from "../store/genreStore";
import { useBookStore } from "../store/bookStore";

export function Catalog() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const { genres, fetchGenres } = useGenreStore();
  const { books, isLoading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchGenres();
    fetchBooks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authors?.some((a) =>
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesGenre =
      activeGenre === "All" ||
      book.genres?.some((g) => g.name === activeGenre);

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gray-50 md:ml-64">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Book Catalog</h1>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 h-11 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[{ id: 0, name: "All" }, ...genres].map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setActiveGenre(genre.name)}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                    activeGenre === genre.name
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <p className="text-sm text-gray-400 mb-5">{filteredBooks.length} books available</p>

        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={book.book_avatar || "https://via.placeholder.com/200x300"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {book.authors?.map((a) => `${a.first_name} ${a.last_name}`).join(", ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">4.5</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {book.genres?.[0]?.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="flex flex-col gap-3">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={book.book_avatar || "https://via.placeholder.com/200x300"}
                  alt={book.title}
                  className="w-16 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-0.5">{book.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {book.authors?.map((a) => `${a.first_name} ${a.last_name}`).join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{book.description}</p>
                  <div className="flex gap-1">
                    {book.genres?.map((g) => (
                      <span key={g.id} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-sm">No books found</p>
          </div>
        )}
      </div>
    </div>
  );
}