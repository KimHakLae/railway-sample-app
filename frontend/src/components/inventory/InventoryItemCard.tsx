import type { InventoryWithItem } from "../../types/inventory";
import { CATEGORY_INFO, STORAGE_INFO } from "../../constants/categoryConstants";

interface Props {
  item: InventoryWithItem;
  toggleUrgent: (id: number) => void;
  confirmDeleteHandler: (id: number) => void;
  setEditItem: (item: InventoryWithItem) => void;
  setOpenEdit: (v: boolean) => void;
}

export default function InventoryItemCard({ item, toggleUrgent, confirmDeleteHandler, setEditItem, setOpenEdit }: Props) {
  const getDDayInfo = (date?: string) => {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - new Date().setHours(0,0,0,0)) / 86400000);
    
    if (diff < 0) return { label: `D+${Math.abs(diff)}`, status: "expired", text: "유통기한 경과", color: "bg-rose-500" };
    if (diff === 0) return { label: "D-Day", status: "imminent", text: "오늘 만료", color: "bg-orange-500" };
    if (diff <= 3) return { label: `D-${diff}`, status: "imminent", text: "만료 임박", color: "bg-orange-500" };
    return { label: `D-${diff}`, status: "safe", text: "상태 양호", color: "bg-emerald-500" };
  };

  const ddayInfo = getDDayInfo(item.expiryDate);

  const daysFrom = (date?: string) => {
    if (!date) return null;
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (diff === 0) return "오늘 입고";
    return `${diff}일 경과`;
  };

  const ageColor = (date?: string) => {
    if (!date) return "";
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (diff >= 30) return "text-red-600";
    if (diff >= 14) return "text-orange-600";
    if (diff >= 7) return "text-yellow-600";
    return "text-brand-600";
  };

  return (
    <div className={`
      relative premium-card p-5 space-y-4 transition-all duration-300 hover:shadow-xl
      ${item.is_urgent ? "ring-2 ring-red-500/50 bg-red-50/20 shadow-lg shadow-red-500/10 animate-pulse-subtle" : "hover:-translate-y-1"}
      ${ddayInfo?.status === "expired" ? "border-rose-200" : ""}
    `}>
      {/* 상단 액션 및 태그 */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${CATEGORY_INFO[item.item.category].style}`}>
              {CATEGORY_INFO[item.item.category].label}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${STORAGE_INFO[item.storage].style}`}>
              {STORAGE_INFO[item.storage].label}
            </span>
            {item.is_urgent && (
              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-red-500 text-white animate-bounce shadow-sm">
                🚨 긴급
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-gray-900 leading-tight">
            {item.item.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setEditItem(item); setOpenEdit(true); }}
            className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-white hover:text-brand-600 hover:shadow-md transition-all active:scale-90"
            aria-label="수정"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          
          <button 
            onClick={() => confirmDeleteHandler(item.id)} 
            className="p-2 rounded-xl bg-gray-50 text-gray-300 hover:bg-white hover:text-red-500 hover:shadow-md transition-all active:scale-90" 
            aria-label="삭제"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>

      {/* D-Day 뱃지 (가장 중요한 정보) */}
      {ddayInfo && (
        <div className={`
          flex items-center justify-between p-3 rounded-2xl border-l-4
          ${ddayInfo.status === "expired" ? "bg-rose-50 border-rose-500 text-rose-700" : 
            ddayInfo.status === "imminent" ? "bg-orange-50 border-orange-500 text-orange-700" : 
            "bg-emerald-50 border-emerald-500 text-emerald-700"}
        `}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="text-sm font-black">{ddayInfo.text}</span>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black text-white ${ddayInfo.color} shadow-sm`}>
            {ddayInfo.label}
          </span>
        </div>
      )}

      {/* 수량 및 입고 정보 */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Quantity</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900">{item.quantity}</span>
            <span className="text-xs font-bold text-gray-400">pcs</span>
          </div>
        </div>
        <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Age</p>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-black ${ageColor(item.entryDate)}`}>
              {daysFrom(item.entryDate)}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 정보 및 긴급 토글 */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          입고일: {item.entryDate.slice(0, 10)}
        </div>

        <label className="flex items-center gap-2 cursor-pointer group">
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-red-500 transition-colors">긴급설정</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={item.is_urgent}
              onChange={() => toggleUrgent(item.id)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full transition-all peer-checked:bg-red-500"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all peer-checked:translate-x-4"></div>
          </div>
        </label>
      </div>
    </div>
  );
}