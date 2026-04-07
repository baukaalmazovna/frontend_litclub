import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
} from "../../utils/validators/user_validators"; // путь поправь под себя

export const Profile = () => {
    const { loading, error, userProfile, getUserProfile, updateUserProfile } =
        useUserStore();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        old_password: "",
        new_password: "",
        confirmPassword: "",
    });

    // 🔹 ошибки по полям
    const [errors, setErrors] = useState({
        email: "",
        first_name: "",
        last_name: "",
        new_password: "",
        confirmPassword: "",
    });

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        if (userProfile) {
            setForm((prev) => ({
                ...prev,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
            }));
        }
    }, [userProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const firstNameError = validateFirstName(form.first_name);
        const lastNameError = validateLastName(form.last_name);
        const emailError = validateEmail(form.email);

        let passwordError = null;
        let confirmPasswordError = null;

        // пароль проверяем только если пользователь вводит его
        if (form.new_password) {
            passwordError = validatePassword(form.new_password);

            if (form.new_password !== form.confirmPassword) {
                confirmPasswordError = "Пароли не совпадают";
            }
        }

        setErrors({
            email: emailError || "",
            first_name: firstNameError || "",
            last_name: lastNameError || "",
            new_password: passwordError || "",
            confirmPassword: confirmPasswordError || "",
        });

        return !(firstNameError || lastNameError || emailError || passwordError || confirmPasswordError);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccess(false);

        const isValid = validateForm();
        if (!isValid) return;

        try {
            await updateUserProfile({
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                old_password: form.old_password || "",
                new_password: form.new_password,
                avatarUrl: null as any,
            });

            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err: any) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Профиль пользователя
            </h1>

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    Профиль успешно обновлён!
                </div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow space-y-4"
            >
                <input
                    type="text"
                    name="first_name"
                    placeholder="Имя"
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />
                {errors.first_name && (
                    <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}

                <input
                    type="text"
                    name="last_name"
                    placeholder="Фамилия"
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />
                {errors.last_name && (
                    <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                {/* OLD PASSWORD */}
                <input
                    type="password"
                    name="old_password"
                    placeholder="Старый пароль"
                    value={form.old_password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="new_password"
                    placeholder="Новый пароль"
                    value={form.new_password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />
                {errors.new_password && (
                    <p className="text-red-500 text-sm">{errors.new_password}</p>
                )}

                {/* CONFIRM */}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    Сохранить
                </button>
            </form>
        </div>
    );
};