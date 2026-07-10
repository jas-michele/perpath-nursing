import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export const registerUser = async (user: RegisterUser) => {
  const response = await axios.post(
    `${API}/api/auth/register`,
    user
  );

  return response.data;
};

export const loginUser = async (user: LoginUser) => {
  const response = await axios.post(
    `${API}/api/auth/login`,
    user
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.user;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};