import { useEffect, useState } from "react"
import NoteCard from "../components/NoteCard"
import NewNoteForm from "../components/NewNoteForm"

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // ✅ HTTP 에러 체크
      if (!res.ok) {
        throw new Error("API Error")
      }

      const data = await res.json()

      // ✅ 빈 배열은 정상 상태
      setNotes(Array.isArray(data) ? data : [])

    } catch (e) {
      alert("서버 연결 실패 😥")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("삭제할까요?")) return

    await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setNotes(notes.filter(n => n.id !== id))
  }

  const handleCreated = (note: Note) => {
    setNotes([note, ...notes])
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 헤더 */}
      <h1 className="!text-3xl mb-6 font-bold">📝 My Notes</h1>

      <NewNoteForm onCreated={handleCreated} />

      {loading && <p className="mt-6">불러오는 중...</p>}

      {!loading && notes.length === 0 && (
        <p className="mt-6 text-gray-500">노트가 없습니다.</p>
      )}

      <div className="mt-6 space-y-4">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}