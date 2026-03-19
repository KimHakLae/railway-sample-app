import { useEffect, useState } from "react"
import UserCard from "../components/admin/UserCard"

interface User {
  user_id: number // backend follows this naming
  email: string
  auth_status: string
  is_admin: boolean
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const API_URL = import.meta.env.VITE_API_URL || ""

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to fetch users")
      }
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const approveUser = async (id: number) => {
    const res = await fetch(`${API_URL}/api/admin/users/${id}/approve`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) {
      const errorData = await res.json()
      alert(errorData.message || "승인 처리 실패")
    } else {
      fetchUsers()
    }
  }

  const rejectUser = async (id: number) => {
    const res = await fetch(`${API_URL}/api/admin/users/${id}/reject`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) {
      const errorData = await res.json()
      alert(errorData.message || "거절 처리 실패")
    } else {
      fetchUsers()
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">👥 사용자 승인 관리</h1>
        <p className="text-gray-500 dark:text-gray-400">시스템 가입 요청을 검토하고 승인 여부를 결정합니다.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-[32px]" />)}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-slate-700">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-400 font-bold">관리할 사용자가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <UserCard key={u.user_id} user={u} onApprove={approveUser} onReject={rejectUser} />
          ))}
        </div>
      )}
    </div>
  )
}