import type { InventoryWithItem } from "../../types/inventory";
import { CATEGORY_INFO, STORAGE_INFO } from "./InventoryFilters";

interface Props {
  item: InventoryWithItem;
  toggleUrgent: (id: number) => void;
  confirmDeleteHandler: (id: number) => void;
  setEditItem: (item: InventoryWithItem) => void;
  setOpenEdit: (v: boolean) => void;
}

export default function InventoryItemCard({ item, toggleUrgent, confirmDeleteHandler, setEditItem, setOpenEdit }: Props) {
  const dday = (date?: string) => {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
    if (diff < 0) return `D+${Math.abs(diff)}`;
    if (diff === 0) return "D-Day";
    return `D-${diff}`;
  };

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
    <div className={`relative premium-card p-5 space-y-4 transition-all duration-300 hover:shadow-lg ${item.is_urgent ? "ring-2 ring-red-500 bg-red-50/30" : ""}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
            {item.item.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${CATEGORY_INFO[item.item.category].style}`}>
              {CATEGORY_INFO[item.item.category].label}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${STORAGE_INFO[item.storage].style}`}>
              {STORAGE_INFO[item.storage].label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setEditItem(item); setOpenEdit(true); }}
            className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-all active:scale-90"
            aria-label="수정"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          
          <label className="relative flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={item.is_urgent}
              onChange={() => toggleUrgent(item.id)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full transition-all peer-checked:bg-red-500"></div>
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Current Quantity</p>
          <p className="text-xl font-black text-gray-900">{item.quantity} <span className="text-sm font-normal text-gray-400">pcs</span></p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Inventory Age</p>
          <p className={`text-sm font-bold ${ageColor(item.entryDate)}`}>
            {daysFrom(item.entryDate)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px] text-gray-500">
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            입고: {item.entryDate.slice(0, 10)}
          </div>
          {item.expiryDate && (
            <div className="flex items-center gap-1 font-semibold text-orange-600">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              만료: {dday(item.expiryDate)}
            </div>
          )}
        </div>

        <button 
          onClick={() => confirmDeleteHandler(item.id)} 
          className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90" 
          aria-label="삭제"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    </div>
  );
}