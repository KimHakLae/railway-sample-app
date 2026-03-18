// src/pages/InventoryPage.tsx
import { useEffect, useMemo, useState } from "react";
import InventoryModal from "../components/inventory/InventoryModal"; // 그대로 사용
import { createItem, getInventories, createInventory, updateInventory, deleteInventory, toggleUrgentInventory } from "../api/inventory";
import { getItems } from "../api/item";
import type { InventoryWithItem } from "../types/inventory";
import type { Item } from "../types/item";
import { getUserFromToken } from "../utils/auth";
import { useSnackbar } from "../components/ui/SnackbarProvider";
import InventoryStats from "../components/inventory/InventoryStats";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryList from "../components/inventory/InventoryList";

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<InventoryWithItem[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [storageFilter, setStorageFilter] = useState("ALL");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [sort, setSort] = useState("latest");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editItem, setEditItem] = useState<InventoryWithItem | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { showSnackbar, hideSnackbar } = useSnackbar();
  const user = getUserFromToken();

  const resetFilters = () => {
    setKeyword("");
    setCategoryFilter("ALL");
    setStorageFilter("ALL");
    setUrgentOnly(false);
    setSort("latest");
  };

  const fetchInventory = async () => setInventoryList(await getInventories());
  const fetchItems = async () => setItemList(await getItems());

  useEffect(() => {
    fetchInventory();
    fetchItems();
  }, []);

  const createItemHandler = async (data: any) => {
    if (!user) { alert("사용자 정보가 없습니다."); return; }
    let itemId = data.itemId;

    try {
      if (data.isNewItem) itemId = (await createItem({ name: data.itemName, category: data.category })).id;
      await createInventory({ ...data, itemId, userId: user.id });
      await fetchInventory();
      showSnackbar("재고가 등록되었습니다", { type: "success" });
    } catch (err) {
      console.error(err);
      showSnackbar("요청 처리에 실패했습니다", { type: "error" });
      throw err;
    }
  };

  const updateItemHandler = async (id: number, data: any) => { await updateInventory(id, data); await fetchInventory(); showSnackbar("수정이 완료되었습니다", { type: "success" }); };

  const confirmDeleteHandler = (id: number) => {
    showSnackbar("정말 삭제하시겠습니까?", {
      type: "info",
      duration: null,
      action: (
        <div className="flex gap-2 items-center pt-1">
          <button
            onClick={() => hideSnackbar()}
            className="
              px-4 py-1.5 rounded-lg text-xs font-bold
              bg-white/10 hover:bg-white/20
              text-white border border-white/20
              transition-all active:scale-95
            "
          >
            취소
          </button>
          <button
            onClick={async () => {
              hideSnackbar();
              setSubmitting(true);
              setToastMsg("삭제중입니다...");
              try {
                await deleteInventory(id);
                await fetchInventory();
                showSnackbar("삭제되었습니다", { type: "success" });
              } catch (err) {
                console.error(err);
                showSnackbar("삭제 실패 😢", { type: "error" });
              } finally {
                setSubmitting(false);
              }
            }}
            className="
              px-4 py-1.5 rounded-lg text-xs font-bold
              bg-red-500 hover:bg-red-600
              text-white shadow-lg shadow-red-900/20
              transition-all active:scale-95
            "
          >
            삭제
          </button>
        </div>
      ),

    });
  };

  const toggleUrgent = async (id: number) => {
    if (loadingId) return;
    setLoadingId(id);
    const prevList = inventoryList;
    setInventoryList(list => list.map(i => i.id === id ? { ...i, is_urgent: !i.is_urgent } : i));
    try { await toggleUrgentInventory(id); } catch (err) { console.error(err); setInventoryList(prevList); alert("긴급 상태 변경 실패 😢"); } finally { setLoadingId(null); }
  };

  const filtered = useMemo(() => {
    let list = [...inventoryList];
    if (keyword) list = list.filter(i => i.item.name.includes(keyword));
    if (categoryFilter !== "ALL") list = list.filter(i => i.item.category === categoryFilter);
    if (storageFilter !== "ALL") list = list.filter(i => i.storage === storageFilter);
    if (urgentOnly) list = list.filter(i => i.is_urgent);
    list.sort((a, b) => {
      if (a.is_urgent !== b.is_urgent) return a.is_urgent ? -1 : 1;
      if (sort === "latest") return +new Date(b.entryDate) - +new Date(a.entryDate);
      if (sort === "oldest") return +new Date(a.entryDate) - +new Date(b.entryDate);
      if (sort === "name") return a.item.name.localeCompare(b.item.name);
      if (sort === "qty") return b.quantity - a.quantity;
      return 0;
    });
    return list;
  }, [inventoryList, keyword, urgentOnly, sort, categoryFilter, storageFilter]);

  const stats = useMemo(() => {
    const today = new Date().setHours(0,0,0,0);
    return { 
      total: inventoryList.length, 
      urgent: inventoryList.filter(i => i.is_urgent).length, 
      expired: inventoryList.filter(i => i.expiryDate && new Date(i.expiryDate).getTime() < today).length,
      qty: inventoryList.reduce((s, i) => s + i.quantity, 0) 
    };
  }, [inventoryList]);

  const isFiltered =
    Boolean(keyword) ||
    categoryFilter !== "ALL" ||
    storageFilter !== "ALL" ||
    urgentOnly ||
    sort !== "latest";

  return (
    <div className="space-y-6">
      {submitting && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"><div className="px-6 py-3 rounded-full shadow-2xl bg-black text-white text-sm font-bold animate-fade-in">{toastMsg}</div></div>}
      
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">🍱 식재료 관리</h1>
        <p className="text-gray-500">신선한 요리를 위해 보유 중인 식재료 상태를 관리합니다.</p>
      </div>

      <InventoryStats {...stats} />
      
      <div className="space-y-4">
        <InventoryFilters keyword={keyword} setKeyword={setKeyword} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} storageFilter={storageFilter} setStorageFilter={setStorageFilter} urgentOnly={urgentOnly} setUrgentOnly={setUrgentOnly} sort={sort} setSort={setSort} isFiltered={isFiltered} resetFilters={resetFilters} />
        <InventoryList items={filtered} toggleUrgent={toggleUrgent} confirmDeleteHandler={confirmDeleteHandler} setEditItem={setEditItem} setOpenEdit={setOpenEdit} />
      </div>

      {openCreate && <InventoryModal title="재고 등록" onClose={() => setOpenCreate(false)} onSubmit={async (data) => { setOpenCreate(false); setSubmitting(true); setToastMsg("등록중입니다..."); try { await createItemHandler(data); } finally { setSubmitting(false); } }} itemList={itemList} />}
      {openEdit && editItem && <InventoryModal title="재고 수정" initialData={editItem} onClose={() => setOpenEdit(false)} onSubmit={async (data) => { setOpenEdit(false); setSubmitting(true); setToastMsg("수정중입니다..."); try { await updateItemHandler(editItem.id, data); } finally { setSubmitting(false); } }} itemList={itemList} />}

      {/* 재고 등록 버튼 (플로팅 버튼 스타일 개선) */}
      <button
        onClick={() => setOpenCreate(true)}
        className="
          fixed bottom-8 right-8
          w-16 h-16
          rounded-2xl
          bg-brand-600
          text-white
          flex items-center justify-center
          shadow-2xl shadow-brand-200
          hover:bg-brand-700 hover:scale-110 active:scale-95
          transition-all duration-300
          z-40
        "
        aria-label="식재료 등록"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  );
}