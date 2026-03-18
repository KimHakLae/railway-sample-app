import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ArchiveBoxIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import type { Stock } from '../../types/stock';

interface DashboardProps {
  stocks: Stock[];
}

const Dashboard: React.FC<DashboardProps> = ({ stocks }) => {
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  // 유통기한 임박 항목 (3일 이내)
  const urgentStocks = stocks.filter(s => {
    if (!s.expiryDate) return false;
    const expiry = new Date(s.expiryDate);
    return expiry <= threeDaysFromNow && expiry >= now;
  });

  // 이미 유통기한 지난 항목
  const expiredStocks = stocks.filter(s => {
    if (!s.expiryDate) return false;
    return new Date(s.expiryDate) < now;
  });

  const totalQuantity = stocks.reduce((acc, s) => acc + s.quantity, 0);

  return (
    <div className="space-y-6">
      {/* 알림 배너 - 유통기한 임박/만료 */}
      {(urgentStocks.length > 0 || expiredStocks.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {expiredStocks.length > 0 && (
            <div className="bg-rose-50 border border-rose-100 p-5 rounded-[2rem] flex items-center gap-4 shadow-sm shadow-rose-100/50">
              <div className="p-3 bg-rose-500 rounded-2xl text-white">
                <BellAlertIcon className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-rose-900 font-black text-lg">유통기한 만료 항목 {expiredStocks.length}건</h3>
                <p className="text-rose-600 font-bold text-sm">지금 바로 확인하고 정리해 주세요!</p>
              </div>
            </div>
          )}
          {urgentStocks.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 p-5 rounded-[2rem] flex items-center gap-4 shadow-sm shadow-amber-100/50">
              <div className="p-3 bg-amber-500 rounded-2xl text-white">
                <ExclamationTriangleIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-amber-900 font-black text-lg">유통기한 임박 항목 {urgentStocks.length}건</h3>
                <p className="text-amber-600 font-bold text-sm">3일 이내에 사용해야 하는 식재료가 있어요.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3 group hover:border-brand-500/30 transition-all">
          <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
            <ArchiveBoxIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 font-black text-xs uppercase tracking-widest">전체 보유량</p>
            <h4 className="text-2xl font-black text-gray-900">{totalQuantity} <span className="text-sm text-gray-400">Items</span></h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3 group hover:border-emerald-500/30 transition-all">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 font-black text-xs uppercase tracking-widest">신선 재료</p>
            <h4 className="text-2xl font-black text-gray-900">
              {stocks.length - urgentStocks.length - expiredStocks.length} <span className="text-sm text-gray-400">Types</span>
            </h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3 group hover:border-rose-500/30 transition-all">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
            <ExclamationTriangleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 font-black text-xs uppercase tracking-widest">관리 필요</p>
            <h4 className="text-2xl font-black text-gray-900">
              {urgentStocks.length + expiredStocks.length} <span className="text-sm text-gray-400">Needs Care</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
