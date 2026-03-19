import { useEffect, useState } from "react"
import NoteCard from "../components/notes/NoteCard"
import NewNoteForm from "../components/notes/NewNoteForm"

interface Note {
  id: number
  title: string
  content?: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("API Error")
      const data = await res.json()
      setNotes(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleDelete = async (id: number) => {
    await fetch(`/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    setNotes(notes.filter(n => n.id !== id))
  }

  const handleCreated = (note: Note) => {
    setNotes([note, ...notes])
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">📝 내 노트 관리</h1>
        <p className="text-gray-500 dark:text-gray-400">생각이나 업무 내용을 자유롭게 기록하세요.</p>
      </div>

      <NewNoteForm onCreated={handleCreated} />

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
            <p className="text-gray-400 font-medium">작성된 노트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}