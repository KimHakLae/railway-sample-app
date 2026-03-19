/**
 * 카테고리 표시 정보 (아이콘 + 한글 + 스타일)
 * 재고관리, 품목관리 등 모든 화면에서 공통으로 사용
 */
export const CATEGORY_INFO: Record<string, { label: string; style: string }> = {
  VEG:         { label: "🥬 야채",     style: "!bg-green-100 dark:bg-green-900/50 text-green-700" },
  FRUIT:       { label: "🍎 과일",     style: "!bg-pink-100 text-pink-700" },
  SPICE:       { label: "🧂 조미료",   style: "!bg-yellow-100 text-yellow-700" },
  SAUCE:       { label: "🥫 양념장",   style: "!bg-orange-100 text-orange-700" },
  MEAT:        { label: "🥩 고기",     style: "!bg-red-100 dark:bg-red-900/50 text-red-700" },
  SNACK:       { label: "🍪 간식",     style: "!bg-purple-100 text-purple-700" },
  FOOD:        { label: "🍱 반찬",     style: "!bg-amber-100 text-amber-700" },
  FROZEN_FOOD: { label: "🧊 냉동식품", style: "!bg-blue-100 dark:bg-blue-900/50 text-blue-700" },
  ETC:         { label: "📦 기타",     style: "!bg-gray-100 text-gray-700 dark:text-gray-300" },
};

/**
 * 보관방법 표시 정보 (아이콘 + 한글 + 스타일)
 */
export const STORAGE_INFO: Record<string, { label: string; style: string }> = {
  R:  { label: "🧊 냉장",  style: "!bg-cyan-100 text-cyan-700" },
  F:  { label: "❄️ 냉동",  style: "!bg-indigo-100 text-indigo-700" },
  RT: { label: "🌡️ 상온", style: "!bg-orange-100 text-orange-700" },
};
