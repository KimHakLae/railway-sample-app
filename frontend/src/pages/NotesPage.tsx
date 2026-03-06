import { useEffect, useState } from "react"

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([])
  const token = localStorage.getItem("token")

  const fetchNotes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    setNotes(data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">My Notes</h1>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg border bg-white p-4 shadow"
          >
            {note.title}
          </div>
        ))}
      </div>
    </div>
  )
}