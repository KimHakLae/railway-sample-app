const API_URL = import.meta.env.VITE_API_URL || ""

export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/notes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};