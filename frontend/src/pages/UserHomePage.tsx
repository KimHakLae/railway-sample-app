import { Link } from "react-router-dom"
import Card from "../components/ui/Card"

export default function UserHomePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          환영합니다! 👋
        </h1>
        <p className="text-gray-500">원하시는 메뉴를 선택하여 관리를 시작하세요.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/inventory" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📦</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              재고 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              모든 보관 물품의 수량, 위치(상온, 냉장, 냉동) 및 긴급도를 실시간으로 관리합니다.
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
              시스템에 등록된 품목과 버전을 추가·수정·삭제하고 재고 수량을 한눈에 확인합니다.
            </p>
          </Card>
        </Link>

        <Link to="/notes" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none font-bold">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              내 노트 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              업무에 필요한 개인적인 메모나 기록을 안전하게 관리하고 보관하세요.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}