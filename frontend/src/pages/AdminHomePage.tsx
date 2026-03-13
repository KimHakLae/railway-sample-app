import { Link } from "react-router-dom"
import Card from "../components/ui/Card"

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          🛠 관리자 콘솔
        </h1>
        <p className="text-gray-500">시스템 설정 및 사용자 승인 상태를 관리합니다.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/users" className="group">
          <Card className="h-full hover:ring-2 hover:ring-red-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">👥</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
              유저 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              신규 가입 유저의 승인(Approved) 및 권한을 관리합니다.
            </p>
          </Card>
        </Link>

        <Link to="/inventory" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📦</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
               재고 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
               전체 보관 물품의 실시간 현황을 모니터링하고 수정합니다.
            </p>
          </Card>
        </Link>

        <Link to="/items" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📑</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              품목 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              품목 등록·수정·삭제 및 버전 관리, 재고 수량 현황을 확인합니다.
            </p>
          </Card>
        </Link>

        <Link to="/notes" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              노트 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
               시스템 공지사항 또는 관리용 메모를 작성하고 조회합니다.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}