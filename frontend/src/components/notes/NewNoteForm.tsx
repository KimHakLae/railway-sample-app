import { useState } from "react"

interface Props {
  onCreated: (note: any) => void
}

export default function NewNoteForm({ onCreated }: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return alert("제목 입력")

    setLoading(true)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })

    const data = await res.json()
    onCreated(data)

    setTitle("")
    setContent("")
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card p-6 space-y-4 shadow-xl shadow-gray-100"
    >
      <input
        className="premium-input font-bold"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="premium-input min-h-[120px] resize-none"
        placeholder="어떤 기록을 남기고 싶으신가요?"
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div className="flex justify-end pt-2">
        <button
          disabled={loading}
          className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-100 hover:bg-brand-700 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          )}
          {loading ? "저장 중..." : "노트 추가하기"}
        </button>
      </div>
    </form>
  )
}