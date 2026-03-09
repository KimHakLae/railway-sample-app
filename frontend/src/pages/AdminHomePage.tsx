import { Link } from "react-router-dom"
import LogoutForm from "../components/LogoutForm"

export default function AdminHomePage() {
  return (
    <div className="w-screen mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="!text-2xl font-bold mb-0">🛠 관리자 메뉴</h1>
        <LogoutForm />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          to="/admin/users"
          className="p-6 bg-white rounded-xl shadow hover:shadow-md border"
        >
          <h2 className="text-lg font-semibold mb-2">👥 유저 관리</h2>
          <p className="text-sm text-gray-500">
            인증 요청 사용자 관리
          </p>
        </Link>

        <Link
          to="/admin/notes"
          className="p-6 bg-white rounded-xl shadow hover:shadow-md border"
        >
          <h2 className="text-lg font-semibold mb-2">📝 노트 관리</h2>
          <p className="text-sm text-gray-500">
            전체 사용자 노트 조회
          </p>
        </Link>
      </div>
    </div>
  )
}