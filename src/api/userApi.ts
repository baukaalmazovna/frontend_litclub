import { api } from "./api";
import type { User } from "../types/user";
import type { UserProfile } from "../types/userProfile";

export const userApi = {
  getProfile: async (): Promise<User> => {
    const res = await api.get("/users/profile");
    return res.data;
  },

  updateProfile: async (data: UserProfile): Promise<User> => {
    const res = await api.put("/users/profile", data);
    return res.data;
  },
};
