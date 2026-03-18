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
              <span className="text-2xl">🍱</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              식재료 관리
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              보유 중인 식재료의 신선도, 수량 및 보관 위치(냉장, 냉동)를 실시간으로 확인하고 관리합니다.
            </p>
          </Card>
        </Link>

        <Link to="/items" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🥬</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              식재료 종류
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              자주 사용하는 식재료 종류를 등록하고, 전체적인 재고 현황을 카테고리별로 파악합니다.
            </p>
          </Card>
        </Link>

        <Link to="/notes" className="group">
          <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none font-bold">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
              레시피 & 노트
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              나만의 요리 레시피나 식단 계획, 장보기 리스트 등을 자유롭게 메모하고 보관하세요.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}