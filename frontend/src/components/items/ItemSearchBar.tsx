import React from "react";

interface ItemSearchBarProps {
  keyword: string;
  setKeyword: (kw: string) => void;
  onOpenAdd: () => void;
}

const ItemSearchBar: React.FC<ItemSearchBarProps> = ({ keyword, setKeyword, onOpenAdd }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">🥬 식재료 종류 관리</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">자주 사용하는 식재료 종류를 추가하고 재고 현황을 파악합니다.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="식재료 종류 검색..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button
          onClick={onOpenAdd}
          className="
            flex items-center gap-2
            px-5 py-3
            bg-brand-600
            hover:bg-brand-700
            text-white
            rounded-2xl
            text-sm font-black
            shadow-lg shadow-brand-500/20 dark:shadow-none
            transition-all active:scale-95
            whitespace-nowrap
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          식재료 추가
        </button>
      </div>
    </div>
  );
};

export default ItemSearchBar;
