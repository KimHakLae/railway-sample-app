export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};