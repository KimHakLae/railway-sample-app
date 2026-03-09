interface Props {
  note: {
    id: number
    title: string
    content?: string
  }
  onDelete: (id: number) => void
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-4 border">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">{note.title}</h2>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          삭제
        </button>
      </div>

      {note.content && (
        <p className="mt-2 text-gray-600 whitespace-pre-wrap">
          {note.content}
        </p>
      )}
    </div>
  )
}