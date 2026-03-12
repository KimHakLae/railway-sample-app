export const CATEGORY_INFO: Record<string, { label: string; style: string }> = {
  VEG:         { label: "🥬 야채",       style: "!bg-green-100 text-green-700" },
  FRUIT:       { label: "🍎 과일",       style: "!bg-pink-100 text-pink-700" },
  SPICE:       { label: "🧂 조미료",     style: "!bg-yellow-100 text-yellow-700" },
  SAUCE:       { label: "🥫 양념장",     style: "!bg-orange-100 text-orange-700" },
  MEAT:        { label: "🥩 고기",       style: "!bg-red-100 text-red-700" },
  SNACK:       { label: "🍪 간식",       style: "!bg-purple-100 text-purple-700" },
  FOOD:        { label: "🍱 음식",       style: "!bg-amber-100 text-amber-700" },
  FROZEN_FOOD: { label: "🧊 냉동식품",   style: "!bg-blue-100 text-blue-700" },
  ETC:         { label: "📦 기타",       style: "!bg-gray-100 text-gray-700" },
};

export const STORAGE_INFO: Record<string, { label: string; style: string }> = {
  R: { label: "🧊 냉장", style: "!bg-cyan-100 text-cyan-700" },
  F: { label: "❄️ 냉동", style: "!bg-indigo-100 text-indigo-700" },
  RT: { label: "🌡️ 상온", style: "!bg-orange-100 text-orange-700" },
};

interface Props {
  keyword: string;
  setKeyword: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  storageFilter: string;
  setStorageFilter: (v: string) => void;
  urgentOnly: boolean;
  setUrgentOnly: (v: boolean) => void;
  sort: string;
  setSort: (v: string) => void;
  isFiltered: boolean;
  resetFilters: () => void;
}

export default function InventoryFilters({
  keyword, setKeyword,
  categoryFilter, setCategoryFilter,
  storageFilter, setStorageFilter,
  urgentOnly, setUrgentOnly,
  sort, setSort,
  isFiltered,
  resetFilters
}: Props) {
  return (
    <div className={`premium-card p-4 space-y-6 transition-all duration-300 ${urgentOnly ? "ring-1 ring-red-400 bg-red-50/20" : ""}`}>
      {/* 칩 섹터: 카테고리 필터 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Categories</div>
          {categoryFilter !== "ALL" && (
            <button onClick={() => setCategoryFilter("ALL")} className="text-[10px] font-bold text-brand-600 hover:underline">Reset</button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`
              flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${categoryFilter === "ALL" 
                ? "bg-brand-600 text-white shadow-lg shadow-brand-200" 
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"}
            `}
          >
            전체
          </button>
          {Object.entries(CATEGORY_INFO).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`
                flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                ${categoryFilter === key 
                  ? `${info.style} shadow-lg ring-2 ring-current ring-offset-2` 
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"}
              `}
            >
              {info.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-50"></div>

      {/* 기타 검색 및 필터 파트 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              placeholder="재고명을 입력하세요" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-100 focus:bg-white transition-all outline-none" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
            />
          </div>
          <select 
            className="px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-100 outline-none appearance-none cursor-pointer" 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="name">이름순</option>
            <option value="qty">수량순</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <select 
              className="px-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-100 outline-none cursor-pointer" 
              value={storageFilter} 
              onChange={(e) => setStorageFilter(e.target.value)}
            >
              <option value="ALL">전체 보관방식</option>
              <option value="R">❄️ 냉장</option>
              <option value="F">🧊 냉동</option>
              <option value="RT">🌡️ 상온</option>
            </select>
            {isFiltered && (
               <button
                onClick={resetFilters}
                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="필터 초기화"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer group">
            <span className={`text-xs font-bold transition-colors ${urgentOnly ? "text-red-500" : "text-gray-400 group-hover:text-gray-600"}`}>긴급항목</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={urgentOnly}
                onChange={() => setUrgentOnly(!urgentOnly)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 rounded-full transition-colors peer-checked:bg-red-500"></div>
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all peer-checked:translate-x-4"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}