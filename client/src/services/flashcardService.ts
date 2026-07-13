import axios from "axios";

const API = import.meta.env.VITE_API_URL;
console.log(API)

const getToken = () => {
    return localStorage.getItem("token");
};

export const generateFlashcards = async (
    lessonText: string
) => {

    const respone = await axios.post(
        `${API}/api/flashcards/generate`,
        {
            lessonText,
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return respone.data;
};

export const getFlashcards = async () => {

    const respone = await axios.get(
        `${API}/flashcards`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return respone.data;
}