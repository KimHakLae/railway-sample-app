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
      className="bg-gray-50 p-4 rounded-xl border"
    >
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="내용"
        rows={3}
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        disabled={loading}
        className="!bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "저장 중..." : "노트 추가"}
      </button>
    </form>
  )
}