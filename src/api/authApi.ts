import { api } from "./api";

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    return res.data;
  },
};
