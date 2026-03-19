import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Dashboard from "../components/dashboard/Dashboard";
import { getStocks } from "../api/stocks";
import type { Stock } from "../types/stock";
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  Square3Stack3DIcon, 
  PencilSquareIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function UserHomePage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (err) {
      console.error("Failed to fetch stocks:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          오늘의 요리 비서 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">냉장고 상태를 확인하고 맛있는 식사를 준비해 보세요.</p>
      </div>

      {/* 스마트 대시보드 */}
      {!loading && <Dashboard stocks={stocks} />}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-50 dark:bg-slate-900 animate-pulse rounded-[2rem]" />)}
        </div>
      )}

      {/* 바로가기 메뉴 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">바로가기</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/inventory" className="group">
            <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand-100/50 p-8 rounded-[2.5rem]">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBagIcon className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  식재료 관리
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                보유 중인 식재료의 유통기한과 수량을 실시간으로 관리하세요.
              </p>
            </Card>
          </Link>

          <Link to="/items" className="group">
            <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand-100/50 p-8 rounded-[2.5rem]">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Square3Stack3DIcon className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  식재료 종류
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                자주 사용하는 식재료 카테고리를 설정하고 현황을 파악합니다.
              </p>
            </Card>
          </Link>

          <Link to="/recipes" className="group">
            <Card className="h-full hover:ring-2 hover:ring-brand-500 transition-all border-none bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand-100/50 p-8 rounded-[2.5rem]">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PencilSquareIcon className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  요리 레시피
                </h2>
                <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                보유 식재료 맞춤형 레시피로 매일의 식단을 계획해 보세요.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}