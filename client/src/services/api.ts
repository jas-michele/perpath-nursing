const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

export default API_URL;