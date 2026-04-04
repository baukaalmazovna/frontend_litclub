import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const AdminLogin = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Заполните все поля");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/admin_dashboard");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
        
        {/* Заголовок */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-400">
            Вход для администратора
          </p>
        </div>

        {/* Поля */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Пароль
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition"
            />
          </div>
        </div>

        {/* Кнопка */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-gray-100 text-gray-900 font-medium hover:bg-white transition disabled:opacity-40"
        >
          {loading ? "Вход..." : "Войти"}
        </button>

        {/* Футер */}
        <p className="text-xs text-center text-gray-600">
          Только для авторизованных администраторов
        </p>

      </div>
    </div>
  );
};