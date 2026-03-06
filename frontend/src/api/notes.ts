export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/notes", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};