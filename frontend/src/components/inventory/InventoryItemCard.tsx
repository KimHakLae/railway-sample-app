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
    return "text-indigo-600";
  };

  return (
    <div className={`relative p-3 rounded-xl shadow border space-y-2 transition-colors ${item.is_urgent ? "!bg-pink-50 border-pink-200" : "bg-white"}`}>
      {/* <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className={`text-xs ${item.is_urgent ? "text-red-600 font-semibold" : "text-gray-400"}`}>긴급</span>
          <input type="checkbox" checked={item.is_urgent} onChange={() => toggleUrgent(item.id)} className="sr-only peer" />
          <div className="w-10 h-6 bg-gray-200 rounded-full transition-colors peer-checked:!bg-red-500"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-4"></div>
        </label>

        <button onClick={() => { setEditItem(item); setOpenEdit(true); }} className="w-7 h-7 flex items-center justify-center rounded-full !bg-white shadow text-gray-400 hover:!bg-yellow-400 hover:text-white transition" aria-label="수정">✎</button>
      </div> */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className={`text-xs ${item.is_urgent ? "text-red-600 font-semibold" : "text-gray-400"}`}>긴급</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={item.is_urgent}
              onChange={() => toggleUrgent(item.id)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full transition-colors peer-checked:!bg-red-500"></div>
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-4"></div>
          </div>
        </label>

        <button
          onClick={() => { setEditItem(item); setOpenEdit(true); }}
          className="w-7 h-7 flex items-center justify-center rounded-full !bg-white shadow text-gray-400 hover:!bg-yellow-400 hover:text-white transition"
          aria-label="수정"
        >
          ✎
        </button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{item.item.name}</div>
          <div className="text-xs text-gray-500">
            입고 {item.entryDate.slice(0, 10)}
            <span className={`ml-2 font-semibold ${ageColor(item.entryDate)}`}>{daysFrom(item.entryDate)}</span>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          <span className={`text-xs px-2 py-1 rounded ${CATEGORY_INFO[item.item.category].style}`}>{CATEGORY_INFO[item.item.category].label}</span>
          <span className={`text-xs px-2 py-1 rounded ${STORAGE_INFO[item.storage].style}`}>{STORAGE_INFO[item.storage].label}</span>
        </div>
      </div>

      {item.expiryDate && (
        <div className="text-xs">
          유통기한 {item.expiryDate.slice(0, 10)}
          <span className="ml-2 font-semibold text-orange-600">{dday(item.expiryDate)}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm">수량 <b>{item.quantity}</b></div>
      </div>

      <button onClick={() => confirmDeleteHandler(item.id)} className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:!bg-red-500 transition" aria-label="삭제">✕</button>
    </div>
  );
}