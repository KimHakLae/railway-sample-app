import React from "react";

interface Note {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  user: {
    email: string;
  };
}

interface AdminNoteCardProps {
  note: Note;
}

const AdminNoteCard: React.FC<AdminNoteCardProps> = ({ note }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
      <div className="text-xs text-brand-500 font-bold mb-1">
        작성자: {note.user?.email ?? "알 수 없음"}
      </div>

      <div className="font-bold text-gray-900">{note.title}</div>

      {note.content && (
        <div className="text-sm text-gray-600 mt-2 line-clamp-3">
          {note.content}
        </div>
      )}

      <div className="text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-wider">
        {new Date(note.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default AdminNoteCard;
