import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const startConversation = async () => {
    const response = await axios.post(
        `${API}/api/ai/start`,
        {},
        getAuthHeaders()
    );

    return response.data;
}

export const sendMessage = async (message: string) => {
    const response = await axios.post(`${API}/api/ai/chat`, 
       { message },
       getAuthHeaders()
    );

    return response.data;
}