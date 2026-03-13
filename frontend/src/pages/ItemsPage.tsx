import { useEffect, useState, useMemo } from "react";
import Card from "../components/ui/Card";
import ItemManagementModal from "../components/ItemManagementModal";
import { getItems, createItem, updateItem, deleteItem } from "../api/item";
import { useSnackbar } from "../components/ui/SnackbarProvider";
import { CATEGORY_INFO } from "../constants/categoryConstants";


export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { showSnackbar, hideSnackbar } = useSnackbar();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      console.log(data)
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("품목 조회 에러:", err);
      setItems([]);
      showSnackbar("품목 목록을 불러오지 못했습니다.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createItem(data);
      await fetchItems();
      setOpenModal(false);
      showSnackbar("새로운 품목이 등록되었습니다.", { type: "success" });
    } catch (err: any) {
      showSnackbar(err.message || "품목 등록에 실패했습니다.", { type: "error" });
      throw err;
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedItem) return;
    try {
      await updateItem(selectedItem.id, data);
      await fetchItems();
      setOpenModal(false);
      showSnackbar("품목 정보가 수정되었습니다.", { type: "success" });
    } catch (err: any) {
      showSnackbar(err.message || "품목 수정에 실패했습니다.", { type: "error" });
      throw err;
    }
  };

  const handleDelete = (id: number) => {
    showSnackbar("정말 이 품목을 삭제하시겠습니까?", {
      type: "info",
      duration: null,
      action: (
        <div className="flex gap-2 pt-1">
          <button onClick={() => hideSnackbar()} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-white">취소</button>
          <button
            onClick={async () => {
              hideSnackbar();
              try {
                await deleteItem(id);
                await fetchItems();
                showSnackbar("품목이 삭제되었습니다.", { type: "success" });
              } catch (err: any) {
                showSnackbar(err.message || "삭제에 실패했습니다.", { type: "error" });
              }
            }}
            className="px-3 py-1 bg-red-500 rounded-lg text-xs font-bold text-white"
          >
            삭제
          </button>
        </div>
      )
    });
  };

  const filtered = useMemo(() => {
    if (!keyword) return items;
    const kw = keyword.toLowerCase();
    return items.filter(item => {
      const catLabel = CATEGORY_INFO[item.category]?.label || item.category;
      return (
        (item.name || "").toLowerCase().includes(kw) ||
        catLabel.toLowerCase().includes(kw)
      );
    });
  }, [items, keyword]);

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">📑 품목 관리</h1>
          <p className="text-gray-500 text-sm">시스템에 등록된 전체 품목과 버전을 관리합니다.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="품목명 또는 카테고리 검색..."
              className="w-64 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <button
            onClick={() => { setSelectedItem(null); setOpenModal(true); }}
            className="flex items-center gap-2 px-5 py-3 bg-brand-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-100 hover:bg-brand-700 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 품목
          </button>
        </div>
      </div>

      {/* 목록 */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-40 bg-gray-200 rounded-3xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500 font-bold">
            {keyword ? "검색 결과가 없습니다." : "아직 등록된 품목이 없습니다."}
          </p>
          {!keyword && (
            <button
              onClick={() => { setSelectedItem(null); setOpenModal(true); }}
              className="mt-4 px-5 py-2 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-all"
            >
              첫 번째 품목 등록하기
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const totalQty = item.totalQuantity ?? 0;
            const entryCount = item.inventoryCount ?? 0;
            return (
              <Card key={item.id} className="group hover:scale-[1.02] transition-all cursor-default">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${CATEGORY_INFO[item.category]?.style || "bg-gray-100 text-gray-500"}`}>
                    {CATEGORY_INFO[item.category]?.label || item.category}
                  </span>
                  <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setSelectedItem(item); setOpenModal(true); }}
                      className="p-2 hover:bg-brand-50 text-brand-600 rounded-lg transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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
          })}
        </div>
      )}

      {openModal && (
        <ItemManagementModal
          title={selectedItem ? "품목 수정" : "신규 품목 등록"}
          initialData={selectedItem}
          onClose={() => setOpenModal(false)}
          onSubmit={selectedItem ? handleUpdate : handleAdd}
        />
      )}
    </div>
  );
}
