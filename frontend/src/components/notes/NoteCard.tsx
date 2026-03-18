interface Props {
  note: {
    id: number
    title: string
    content?: string
  }
  onDelete: (id: number) => void
}

import Card from "../ui/Card";

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <Card className="group hover:shadow-lg transition-all border-none relative">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {note.title}
        </h2>
        <button
          onClick={() => onDelete(note.id)}
          className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
          aria-label="노트 삭제"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>

      {note.content && (
        <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap">
          {note.content}
        </p>
      )}
    </Card>
  )
}
