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
export async function generateRoadmapWithRubric(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("rubric", file);

  const response = await fetch(
    "http://localhost:5001/api/roadmap/generate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Roadmap generation failed.");
  }

  return response.json();
}