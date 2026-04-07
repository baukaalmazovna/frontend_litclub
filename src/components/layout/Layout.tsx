import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  UserGroupIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../../store/authStore"; // 👈 добавили

const navItems = [
  { name: "Home", icon: HomeIcon, path: "/dashboard" },
  { name: "Catalog", icon: Squares2X2Icon, path: "/catalog" },
  { name: "Clubs", icon: UserGroupIcon, path: "/clubs" },
  { name: "Events", icon: CalendarIcon, path: "/events" },
  { name: "Profile", icon: UserIcon, path: "/profile" },
];

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useAuthStore((state) => state.logout); // 👈

  const handleLogout = () => {
    logout();
    navigate("/login"); // 👈 после выхода
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r justify-between">
        <div>
          <div className="p-4 text-xl font-bold">MyApp</div>

          <nav className="flex flex-col gap-2 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🔴 Logout внизу */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            Выйти
          </button>
        </div>
      </aside>

      {/* Контент */}
      <main className="flex-1 p-4 pb-16 md:pb-4">
        <Outlet />
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
              {item.name}
            </button>
          );
        })}

        {/* 🔴 Logout (mobile) */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-red-500"
        >
          <UserIcon className="w-6 h-6" />
          Выйти
        </button>
      </nav>
    </div>
  );
}