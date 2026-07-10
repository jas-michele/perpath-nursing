import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function getRoadmap() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/api/roadmap`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.roadmap;
}

export const completeMilestone = async (milestoneId: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
        `${API}/api/roadmap/milestones/${milestoneId}/complete`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};