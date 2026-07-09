import axios from "axios";

const API = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_API_URL);

export const registerUser = async (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post(
        `${API}/api/auth/register`,
        user
    );

    return response.data;
}
