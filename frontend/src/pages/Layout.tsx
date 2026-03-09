import { Outlet, useNavigate } from "react-router-dom"
import { getUserFromToken } from "../utils/auth"
import LogoutForm from "../components/LogoutForm"

export default function Layout() {
  const user = getUserFromToken()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔝 고정 상단바 */}
      <header
        className="fixed top-0 left-0 right-0 h-12
                   bg-white border-b
                   flex items-center justify-between
                   px-4 z-5"
      >
        {/* 🔹 왼쪽 영역 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center
                      rounded-full hover:bg-gray-100
                      text-gray-600 hover:text-black"
          >
            ←
          </button>

        {/* (선택) 관리자 표시 */}
        {user?.is_admin && (
          <span className="text-xs text-red-500 font-semibold">
            ADMIN
          </span>
        )}
        </div>

        {/* 로그아웃 버튼 */}
        <LogoutForm/>
      </header>

      {/* 🔽 본문 (상단바 높이만큼 여백 필수) */}
      <main className="w-screen pt-12 max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}