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
  const [filterOpen, setFilterOpen] = useState(true);
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
        <div className="flex gap-2 items-center">
          <button onClick={() => hideSnackbar()} className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 !text-xs hover:bg-gray-100">취소</button>
          <button onClick={async () => { hideSnackbar(); setSubmitting(true); setToastMsg("삭제중입니다..."); try { await deleteInventory(id); await fetchInventory(); showSnackbar("삭제되었습니다", { type: "success" }); } catch (err) { console.error(err); showSnackbar("삭제 실패 😢", { type: "error" }); } finally { setSubmitting(false); } }} className="px-3 py-1 rounded-md !bg-red-500 text-white !text-xs hover:bg-red-600">삭제</button>
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

  const stats = useMemo(() => ({ total: inventoryList.length, urgent: inventoryList.filter(i => i.is_urgent).length, qty: inventoryList.reduce((s, i) => s + i.quantity, 0) }), [inventoryList]);
  const isFiltered =
    Boolean(keyword) ||
    categoryFilter !== "ALL" ||
    storageFilter !== "ALL" ||
    urgentOnly ||
    sort !== "latest";

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {submitting && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50"><div className="px-4 py-2 rounded-full shadow bg-black text-white text-sm animate-pulse">{toastMsg}</div></div>}
      <h1 className="!text-xl font-bold">📦 재고 관리</h1>
      <InventoryStats {...stats} />
      <InventoryFilters keyword={keyword} setKeyword={setKeyword} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} storageFilter={storageFilter} setStorageFilter={setStorageFilter} urgentOnly={urgentOnly} setUrgentOnly={setUrgentOnly} sort={sort} setSort={setSort} isFiltered={isFiltered} filterOpen={filterOpen} setFilterOpen={setFilterOpen} resetFilters={resetFilters} />
      <InventoryList items={filtered} toggleUrgent={toggleUrgent} confirmDeleteHandler={confirmDeleteHandler} setEditItem={setEditItem} setOpenEdit={setOpenEdit} />

      {openCreate && <InventoryModal title="재고 등록" onClose={() => setOpenCreate(false)} onSubmit={async (data) => { setOpenCreate(false); setSubmitting(true); setToastMsg("등록중입니다..."); try { await createItemHandler(data); } finally { setSubmitting(false); } }} itemList={itemList} />}
      {openEdit && editItem && <InventoryModal title="재고 수정" initialData={editItem} onClose={() => setOpenEdit(false)} onSubmit={async (data) => { setOpenEdit(false); setSubmitting(true); setToastMsg("수정중입니다..."); try { await updateItemHandler(editItem.id, data); } finally { setSubmitting(false); } }} itemList={itemList} />}

      {/* <button onClick={() => setOpenCreate(true)} className="fixed bottom-5 right-5 w-14 h-14 rounded-full border-3 border-blue-500 bg-white text-blue-500 flex items-center justify-center shadow-md hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:scale-105 transition-all duration-200 z-50" aria-label="재고 등록"><span className="text-xl">➕</span></button> */}
      {/* 재고 등록 버튼 */}
      <button
        onClick={() => setOpenCreate(true)}
        className="
          fixed bottom-5 right-5
          w-14 h-14
          rounded-full
          border-3 border-blue-500
          bg-white
          text-blue-500
          flex items-center justify-center
          shadow-md
          hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:scale-105
          transition-all duration-200
          z-50
        "
        aria-label="재고 등록"
      >
        <span className="text-xl">➕</span>
      </button>
    </div>
  );
}