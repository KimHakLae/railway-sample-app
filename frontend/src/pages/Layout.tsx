import { Link } from "react-router-dom"
import { getUserFromToken } from "../utils/auth"

export default function Layout({ children }: any) {
  const user = getUserFromToken()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-lg font-bold">📘 Notes System</h1>

          <nav className="flex gap-4 text-sm">
            {/* 일반 사용자 메뉴 */}
            <Link to="/notes" className="hover:underline">
              내 노트
            </Link>

            {/* 관리자 전용 메뉴 */}
            {user?.is_admin && (
              <>
                <Link to="/admin/users" className="text-blue-600 hover:underline">
                  인증 요청 관리
                </Link>

                <Link to="/admin/notes" className="text-blue-600 hover:underline">
                  전체 노트 관리
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
}