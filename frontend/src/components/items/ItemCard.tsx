import React from "react";
import Card from "../ui/Card";
import { CATEGORY_INFO } from "../../constants/categoryConstants";

interface Item {
  id: number;
  name: string;
  category: string;
  version?: string;
  totalQuantity?: number;
  stockCount?: number;
}

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  const totalQty = item.totalQuantity ?? 0;
  const entryCount = item.stockCount ?? 0;

  return (
    <Card className="group hover:scale-[1.02] transition-all cursor-default">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${CATEGORY_INFO[item.category]?.style || "bg-gray-100 text-gray-500"}`}>
          {CATEGORY_INFO[item.category]?.label || item.category}
        </span>
        <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="p-2 hover:bg-brand-50 text-brand-600 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{item.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400">Version</span>
          <span className="text-xs font-black text-brand-500">{item.version || "N/A"}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Total Stock</span>
          <span className={`text-lg font-black ${totalQty > 0 ? "text-gray-900" : "text-gray-300"}`}>
            {totalQty.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Entries</span>
          <span className="text-sm font-bold text-gray-600">{entryCount} items</span>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
