import { useEffect, useState } from "react"
import AdminNoteCard from "../components/admin/AdminNoteCard"

interface Note {
  id: number
  title: string
  content?: string
  createdAt: string
  user: {
    email: string
  }
}

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) {
          throw new Error("데이터 조회 실패")
        }

        const data: Note[] = await res.json()
        setNotes(data)
      } catch (err) {
        setError("서버 연결 실패")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-center font-bold">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">📝 전체 사용자 노트</h1>
        <p className="text-gray-500">시스템의 모든 사용자가 작성한 노트를 한눈에 확인합니다.</p>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">작성된 노트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <AdminNoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}