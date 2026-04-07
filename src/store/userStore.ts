import { create } from "zustand";
import { api } from "../api/api";
import type { User } from "../types/user";
import type { UserProfile } from "../types/userProfile";
import { userApi } from "../api/userApi";

interface ProfileState {
    loading: boolean
    error: string | null;
    userProfile: User | null;
    getUserProfile: () => Promise<User>;
    updateUserProfile: (user: UserProfile) => void;
}

export const useUserStore = create<ProfileState>((set) => ({
    error: null,
    loading: false,
    userProfile: null,
    getUserProfile: async () => {
        try {
            set({ loading: true });
            const userData = await userApi.getProfile();

            set({
                userProfile: userData,
                loading: false
            });
            return userData;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || "Ошибка входа");
        }
    },

    updateUserProfile: async (data: UserProfile) => {
        try {
            set({ loading: true, error: null });

            const updatedUser = await userApi.updateProfile(data);

            set({
                userProfile: updatedUser,
            });
        } catch (error: any) {
            set({
                error:
                    error?.response?.data?.detail ||
                    error?.message ||
                    "Ошибка обновления профиля",
            });
        } finally {
            set({ loading: false });
        }
    },
}));
