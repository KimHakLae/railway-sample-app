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
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>; // ✅ 여기 수정
  resetFilters: () => void;
}

export default function InventoryFilters({
  keyword, setKeyword,
  categoryFilter, setCategoryFilter,
  storageFilter, setStorageFilter,
  urgentOnly, setUrgentOnly,
  sort, setSort,
  isFiltered,
  filterOpen, setFilterOpen,
  resetFilters
}: Props) {
  return (
    <div className={`rounded-xl border p-3 space-y-3 ${urgentOnly ? "border-red-400 !bg-red-50" : "!bg-white"}`}>
        <div className="flex items-center justify-between">
          <div className="font-semibold">🔎 검색 & 필터</div>
          <div className="flex items-center gap-2">
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-gray-400 hover:text-red-500 !text-sm transition-colors"
                title="검색조건 초기화"
              >
                ↺
              </button>
            )}
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${filterOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

      {!filterOpen && (
        <div className="flex flex-wrap gap-2 text-xs">
          {keyword && <span className="px-2 py-1 rounded !bg-gray-200">검색: {keyword}</span>}
          {categoryFilter !== "ALL" && <span className="px-2 py-1 rounded !bg-gray-200">카테고리: {CATEGORY_INFO[categoryFilter].label}</span>}
          {storageFilter !== "ALL" && <span className="px-2 py-1 rounded !bg-gray-200">보관: {STORAGE_INFO[storageFilter].label}</span>}
          {urgentOnly && <span className="px-2 py-1 rounded !bg-red-100 text-red-700">긴급만</span>}
          {!keyword && categoryFilter === "ALL" && storageFilter === "ALL" && !urgentOnly && <span className="px-2 py-1 rounded !bg-gray-100 text-gray-400">전체 보기</span>}
        </div>
      )}

      {filterOpen && (
        <div className="space-y-2">
          <input placeholder="재고명 검색" className="w-full p-2 border rounded" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          {/* <label className="flex items-center justify-between">
            <span className={`text-sm font-medium ${urgentOnly ? "text-red-600" : "text-gray-700"}`}>긴급만 보기</span>
            <input type="checkbox" checked={urgentOnly} onChange={() => setUrgentOnly(!urgentOnly)} />
          </label> */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${urgentOnly ? "text-red-600" : "text-gray-700"}`}>
                  긴급만 보기
                </div>
                <div className="text-xs text-gray-400">긴급 표시된 재고만 표시</div>
              </div>
              <div className="relative">
                <label className="relative inline-block cursor-pointer">
                  <input
                    type="checkbox"
                    checked={urgentOnly}
                    onChange={() => setUrgentOnly(!urgentOnly)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-7 bg-gray-200 rounded-full transition-colors peer-checked:!bg-red-500"></div>
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
            <div className="border-t mt-3"></div>
          </div>
          <select className="w-full p-2 border rounded" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="name">이름순</option>
            <option value="qty">수량순</option>
          </select>
          <div className="flex gap-2">
            <select className="flex-1 p-2 border rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="ALL">전체 카테고리</option>
              <option value="VEG">야채</option>
              <option value="FRUIT">과일</option>
              <option value="SPICE">조미료</option>
              <option value="SAUCE">양념장</option>
              <option value="MEAT">고기</option>
              <option value="SNACK">간식</option>
              <option value="FOOD">음식</option>
              <option value="FROZEN_FOOD">냉동식품</option>
              <option value="ETC">기타</option>
            </select>
            <select className="flex-1 p-2 border rounded" value={storageFilter} onChange={(e) => setStorageFilter(e.target.value)}>
              <option value="ALL">전체 보관</option>
              <option value="R">냉장</option>
              <option value="F">냉동</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}