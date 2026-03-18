import { useEffect, useState, useMemo } from "react";
import ItemManagementModal from "../components/items/ItemManagementModal";
import ItemSearchBar from "../components/items/ItemSearchBar";
import ItemCard from "../components/items/ItemCard";
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
      <ItemSearchBar 
        keyword={keyword} 
        setKeyword={setKeyword} 
        onNewItem={() => { setSelectedItem(null); setOpenModal(true); }} 
      />

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
          {filtered.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onEdit={(itm) => { setSelectedItem(itm); setOpenModal(true); }} 
              onDelete={handleDelete} 
            />
          ))}
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
