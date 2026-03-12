import { useEffect, useState } from "react"
import Card from "../components/ui/Card"

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
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setUsers(data)
    } catch (e) {
      console.error(e)
    }
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

  const statusInfo: Record<string, { label: string; color: string }> = {
    P: { label: "승인대기", color: "bg-amber-100 text-amber-700" },
    V: { label: "승인완료", color: "bg-green-100 text-green-700" },
    F: { label: "거절됨", color: "bg-red-100 text-red-700" },
    E: { label: "만료됨", color: "bg-gray-100 text-gray-700" },
    R: { label: "취소됨", color: "bg-gray-100 text-gray-700" }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">👥 사용자 승인 관리</h1>
        <p className="text-gray-500">시스템 가입 요청을 검토하고 승인 여부를 결정합니다.</p>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl shadow-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="p-5">사용자 계정 (이메일)</th>
                <th className="p-5">현재 상태</th>
                <th className="p-5 text-right">작업</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {users.map((u: User) => (
                <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-5 font-semibold text-gray-900">{u.email}</td>

                  <td className="p-5">
                    {u.is_admin ? (
                      <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                        최고 관리자
                      </span>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo[u.auth_status]?.color || "bg-gray-100"}`}>
                        {statusInfo[u.auth_status]?.label || u.auth_status}
                      </span>
                    )}
                  </td>

                  <td className="p-5 text-right">
                    {!u.is_admin && u.auth_status === "P" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => approveUser(u.id)}
                          className="px-4 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => rejectUser(u.id)}
                          className="px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white active:scale-95 transition-all"
                        >
                          거절
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl text-gray-300">📭</span>
                      <p className="text-gray-400 font-medium">관리할 사용자가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}