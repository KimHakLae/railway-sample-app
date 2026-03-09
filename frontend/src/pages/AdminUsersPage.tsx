import { useEffect, useState } from "react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(`${import.meta.env.VITE_API_URL}/admin/users/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">인증 대기 사용자</h2>

      <div className="bg-white rounded-lg shadow divide-y">
        {users.map(u => (
          <div key={u.id} className="p-4 flex justify-between">
            <span>{u.email}</span>
            <span className="text-yellow-600">대기중</span>
          </div>
        ))}

        {users.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            대기중인 사용자가 없습니다
          </div>
        )}
      </div>
    </div>
  )
}