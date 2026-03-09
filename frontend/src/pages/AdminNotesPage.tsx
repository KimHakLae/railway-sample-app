import { useEffect, useState } from "react"

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
    return <div className="p-6">불러오는 중...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">📝 전체 사용자 노트</h1>

      {notes.length === 0 ? (
        <div className="text-gray-400">노트가 없습니다</div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <div className="text-xs text-gray-500 mb-1">
                작성자: {note.user?.email ?? "알 수 없음"}
              </div>

              <div className="font-semibold">{note.title}</div>

              {note.content && (
                <div className="text-sm text-gray-600 mt-1">
                  {note.content}
                </div>
              )}

              <div className="text-xs text-gray-400 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}