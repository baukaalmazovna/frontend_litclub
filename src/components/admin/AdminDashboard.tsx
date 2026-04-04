import { useEffect, useState } from "react";
import { BooksList } from "./books/list/BooksList";
import { useBookStore } from "../../store/bookStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [active, setActive] = useState("Books");

  const menu = ["Books", "Authors", "Genres", "Publishers"];

  // 🔹 Zustand store
  const { books, fetchBooks, isLoading, error } = useBookStore();

  // ✅ при первой загрузке — только книги
  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔹 обработка клика (ленивая загрузка)
  const handleMenuClick = (item: string) => {
    setActive(item);

    // 👉 грузим только если нужно
    if (item === "Books" && books.length === 0) {
      fetchBooks();
    }

    // сюда потом добавишь:
    // if (item === "Authors") fetchAuthors();
    // if (item === "Genres") fetchGenres();
  };

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // удаляем токен
    navigate("/admin_login");   // редирект на главную
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between">
        
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center justify-center border-b border-gray-800">
            <div className="text-gray-500 text-sm">LOGO</div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">
            {menu.map((item) => (
              <button
                key={item}
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm transition
                  ${
                    active === item
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile */}
        <div className="p-4 border-t border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <button className="ml-auto text-gray-400 hover:text-white" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gradient-to-br from-gray-800 to-blue-900 p-8">
        
        {/* 🔹 Books */}
        {active === "Books" && (
          <>
            {isLoading && <p className="text-gray-400">Загрузка...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && !error && <BooksList books={books} />}
          </>
        )}

        {/* 🔹 Заглушки */}
        {active === "Authors" && (
          <h1 className="text-2xl">Authors (пока без API)</h1>
        )}

        {active === "Genres" && (
          <h1 className="text-2xl">Genres (пока без API)</h1>
        )}

        {active === "Publishers" && (
          <h1 className="text-2xl">Publishers (пока без API)</h1>
        )}

      </main>
    </div>
  );
};