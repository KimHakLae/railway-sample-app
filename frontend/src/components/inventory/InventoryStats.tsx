interface Props {
  total: number;
  urgent: number;
  expired: number;
  qty: number;
}

export default function InventoryStats({ total, urgent, expired, qty }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* 전체 아이템 */}
      <div className="premium-card p-4 flex flex-col items-center justify-center text-center space-y-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Items</span>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gray-100 text-gray-500 dark:text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 8l-9-4-9 4v8l9 4 9-4V8z"/><path d="M12 22V12"/><path d="M3 8l9 4 9-4"/></svg>
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white">{total}</span>
        </div>
      </div>

      {/* 긴급 항목 */}
      <div className={`premium-card p-4 flex flex-col items-center justify-center text-center space-y-1 transition-all ${urgent > 0 ? "ring-1 ring-red-100 bg-red-50/10" : ""}`}>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-red-400">Urgent</span>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${urgent > 0 ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-400"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span className={`text-xl font-black ${urgent > 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}>{urgent}</span>
        </div>
      </div>

      {/* 만료됨 */}
      <div className={`premium-card p-4 flex flex-col items-center justify-center text-center space-y-1 transition-all ${expired > 0 ? "ring-1 ring-rose-100 bg-rose-50/10" : ""}`}>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-rose-400">Expired</span>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${expired > 0 ? "bg-rose-500 text-white animate-bounce" : "bg-gray-100 text-gray-400"}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <span className={`text-xl font-black ${expired > 0 ? "text-rose-600" : "text-gray-900 dark:text-white"}`}>{expired}</span>
        </div>
      </div>

      {/* 총 수량 */}
      <div className="premium-card p-4 flex flex-col items-center justify-center text-center space-y-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Qty</span>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6l9-4 9 4-9 4-9-4z"/><path d="M3 10l9 4 9-4"/><path d="M3 14l9 4 9-4"/><path d="M3 18l9 4 9-4"/></svg>
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white">{qty}</span>
        </div>
      </div>
    </div>
  );
}