import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { BookCard } from "./ui/BookCard";
import { useEffect } from "react";
import { useBookStore } from "../../store/bookStore";

export const MainDashboard = () => {
  const { books, fetchBooks, isLoading } = useBookStore();

  const user = {
    name: "Username",
    isAuth: true,
  };

  const stats = [
    { label: "Books Read", value: 47 },
    { label: "Reviews", value: 23 },
    { label: "Clubs", value: 3 },
    { label: "Exchanges", value: 15 },
  ];

  const navItems = [
    { name: "Home", icon: HomeIcon },
    { name: "Catalog", icon: BookOpenIcon },
    { name: "Clubs", icon: UserGroupIcon },
    { name: "Events", icon: CalendarIcon },
    { name: "Profile", icon: UserIcon },
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        {user.isAuth && (
          <h1 className="text-2xl font-semibold mb-6">
            Welcome back, {user.name}
          </h1>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded-xl shadow-sm border"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* For You */}
        <div className="flex items-center gap-2 mb-4">
          <StarIcon className="w-5 h-5 text-black" />
          <h2 className="text-lg font-medium">For You</h2>
        </div>

        {/* Books */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 md:hidden">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center text-gray-600"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};