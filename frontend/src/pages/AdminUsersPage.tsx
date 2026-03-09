import { useEffect, useState } from "react"

interface User {
  id: number
  email: string
  auth_status: string
  is_admin: boolean
}

const API_URL = import.meta.env.VITE_API_URL

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const token = localStorage.getItem("token")

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setUsers(data)
    console.log(data);
  }

  const approveUser = async (id: number) => {
    await fetch(`${API_URL}/admin/users/${id}/approve`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchUsers()
  }

  const rejectUser = async (id: number) => {
    await fetch(`${API_URL}/admin/users/${id}/reject`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const statusLabel: Record<string, string> = {
    P: "승인대기",
    V: "승인",
    F: "거절",
    E: "만료",
    R: "취소"
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="!text-xl font-bold mb-6">👥 사용자 관리</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">이메일</th>
              <th className="text-left p-3">상태</th>
              <th className="text-left p-3">관리</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u:any) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.email}</td>

                <td className="p-3">
                  {u.is_admin ? "관리자" : statusLabel[u.auth_status]}
                </td>

                <td className="p-3">
                  {!u.is_admin && u.auth_status === "P" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveUser(u.user_id)}
                        className="px-2 py-1 text-xs !bg-green-500 text-white rounded"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => rejectUser(u.user_id)}
                        className="px-2 py-1 text-xs !bg-red-500 text-white rounded"
                      >
                        거절
                      </button>
                    </div>
                  )}

                  {!u.is_admin && u.auth_status !== "P" && (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-400">
                  사용자 없음
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}