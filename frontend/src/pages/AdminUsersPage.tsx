import { useEffect, useState } from "react"
import Card from "../components/ui/Card"
import UserTable from "../components/admin/UserTable"

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">👥 사용자 승인 관리</h1>
        <p className="text-gray-500">시스템 가입 요청을 검토하고 승인 여부를 결정합니다.</p>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl shadow-gray-100">
        <UserTable users={users} onApprove={approveUser} onReject={rejectUser} />
      </Card>
    </div>
  )
}