import { useEffect, useMemo, useState } from "react";
import InventoryModal from "./InventoryModal";
import {
  createItem,
  getInventories,
  createInventory,
  updateInventory,
  deleteInventory,
  toggleUrgentInventory,
} from "../api/inventory";
import { getItems } from "../api/item";
import type { InventoryWithItem } from "../types/inventory";
import type { Item } from "../types/item";
import { getUserFromToken } from "../utils/auth"

const CATEGORY_LABEL: Record<string, string> = {
  VEG: "야채",
  FRUIT: "과일",
  SPICE: "조미료",
  SAUCE: "양념장",
  MEAT: "고기",
  SNACK: "간식",
  ETC: "기타",
};

const CATEGORY_COLOR: Record<string, string> = {
  VEG: "!bg-green-100 text-green-700",
  FRUIT: "!bg-pink-100 text-pink-700",
  SPICE: "!bg-yellow-100 text-yellow-700",
  SAUCE: "!bg-orange-100 text-orange-700",
  MEAT: "!bg-red-100 text-red-700",
  SNACK: "!bg-purple-100 text-purple-700",
  ETC: "!bg-gray-100 text-gray-700",
};

const STORAGE_LABEL: Record<string, string> = { R: "냉장", F: "냉동" };

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
  
  // 🔥 사용자 정보 확인
  const user = getUserFromToken()

  const resetFilters = () => {
    setKeyword("");
    setCategoryFilter("ALL");
    setStorageFilter("ALL");
    setUrgentOnly(false);
    setSort("latest");
  };

  const fetchInventory = async () => {
    const data = await getInventories();
    setInventoryList(data);
  };

  const fetchItems = async () => {
    const data = await getItems();
    setItemList(data);
  };

  useEffect(() => {
    fetchInventory();
    fetchItems();
  }, []);

  const createItemHandler = async (data: any) => {
    if (!user) return alert("사용자 정보가 없습니다.");

    let itemId = data.itemId; // 기존 아이템일 경우

    if (data.isNewItem) {
      // 신규 아이템 생성
      try {
        const newItem = await createItem({ name: data.itemName, category: data.category }); // createItem은 새 아이템을 DB에 저장하고 { id: number, name: string } 반환한다고 가정
        itemId = newItem.id; // 생성된 아이템 ID 사용
      } catch (err) {
        console.error("아이템 생성 실패", err);
        return alert("아이템 생성에 실패했습니다.");
      }
    }

    // inventory 생성
    try {
      await createInventory({ ...data, itemId, userId: user.id });
      fetchInventory(); // 리스트 새로고침
    } catch (err) {
      console.error("재고 생성 실패", err);
      alert("재고 생성에 실패했습니다.");
    }
  };

  const updateItemHandler = async (id: number, data: any) => {
    await updateInventory(id, data);
    fetchInventory();
  };

  const deleteItemHandler = async (id: number) => {
    if (!confirm("삭제할까요?")) return;
    await deleteInventory(id);
    fetchInventory();
  };

  const toggleUrgent = async (id: number) => {
    await toggleUrgentInventory(id);
    setInventoryList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, is_urgent: !i.is_urgent } : i))
    );
  };

  const dday = (date?: string) => {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
    if (diff < 0) return `D+${Math.abs(diff)}`;
    if (diff === 0) return "D-Day";
    return `D-${diff}`;
  };

  const filtered = useMemo(() => {
    let list = [...inventoryList];
    if (keyword) list = list.filter((i) => i.item.name.includes(keyword));
    if (categoryFilter !== "ALL") list = list.filter((i) => i.item.category === categoryFilter);
    if (storageFilter !== "ALL") list = list.filter((i) => i.storage === storageFilter);
    if (urgentOnly) list = list.filter((i) => i.is_urgent);

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
    const total = inventoryList.length;
    const urgent = inventoryList.filter((i) => i.is_urgent).length;
    const qty = inventoryList.reduce((s, i) => s + i.quantity, 0);
    return { total, urgent, qty };
  }, [inventoryList]);

  const isFiltered =
    keyword || categoryFilter !== "ALL" || storageFilter !== "ALL" || urgentOnly || sort !== "latest";

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
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="!text-xl font-bold">📦 재고 관리</h1>

      {/* 재고 등록 버튼 */}
      <button
        onClick={() => setOpenCreate(true)}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full !bg-blue-600 text-white text-xl shadow-lg z-50"
      >
        +
      </button>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-2 bg-white rounded border">
          전체
          <br />
          <b>{stats.total}</b>
        </div>
        <div className="p-2 bg-white rounded border">
          긴급
          <br />
          <b className="text-red-500">{stats.urgent}</b>
        </div>
        <div className="p-2 bg-white rounded border">
          총수량
          <br />
          <b>{stats.qty}</b>
        </div>
      </div>

      {/* 검색 & 필터 */}
      <div className={`rounded-xl border p-3 space-y-3 ${urgentOnly ? "border-red-400 !bg-red-50" : "!bg-white"}`}>
        <div className="flex items-center justify-between">
          <div className="font-semibold">🔎 검색 & 필터</div>
          <button onClick={() => setFilterOpen((v) => !v)} className="p-1 rounded-full hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`transition-transform ${filterOpen ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {!filterOpen && (
          <div className="flex flex-wrap gap-2 text-xs">
            {keyword && <span className="px-2 py-1 rounded !bg-gray-200">검색: {keyword}</span>}
            {categoryFilter !== "ALL" && <span className="px-2 py-1 rounded !bg-gray-200">카테고리: {CATEGORY_LABEL[categoryFilter]}</span>}
            {storageFilter !== "ALL" && <span className="px-2 py-1 rounded !bg-gray-200">보관: {STORAGE_LABEL[storageFilter]}</span>}
            {urgentOnly && <span className="px-2 py-1 rounded !bg-red-100 text-red-700">긴급만</span>}
            {!keyword && categoryFilter === "ALL" && storageFilter === "ALL" && !urgentOnly && <span className="px-2 py-1 rounded !bg-gray-100 text-gray-400">전체 보기</span>}
            <button onClick={resetFilters} className={`px-3 py-2 text-xs rounded border ${isFiltered ? "!bg-red-500 text-white border-red-500" : "bg-white"}`}>
              초기화
            </button>
          </div>
        )}

        {/* 필터 펼치기 */}
        <div className={`grid transition-all duration-300 ease-in-out ${filterOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden space-y-2">
            {filterOpen && (
              <>
                <input placeholder="재고명 검색" className="w-full p-2 border rounded" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 p-2 rounded border bg-white cursor-pointer select-none">
                    <span className={`text-sm ${urgentOnly ? "text-red-600 font-semibold" : "text-gray-500"}`}>긴급만</span>
                    <input type="checkbox" checked={urgentOnly} onChange={() => setUrgentOnly((v) => !v)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:!bg-red-500 relative transition-colors">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                    </div>
                  </label>
                  <select className="flex-1 p-2 border rounded" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                    <option value="name">이름순</option>
                    <option value="qty">수량순</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <select className="flex-1 p-2 border rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="ALL">전체 카테고리</option>
                    <option value="VEG">야채</option>
                    <option value="FRUIT">과일</option>
                    <option value="SPICE">조미료</option>
                    <option value="SAUCE">양념장</option>
                    <option value="MEAT">고기</option>
                    <option value="SNACK">간식</option>
                    <option value="ETC">기타</option>
                  </select>
                  <select className="flex-1 p-2 border rounded" value={storageFilter} onChange={(e) => setStorageFilter(e.target.value)}>
                    <option value="ALL">전체 보관</option>
                    <option value="R">냉장</option>
                    <option value="F">냉동</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className={`relative p-3 rounded-xl shadow border space-y-2 transition-colors ${item.is_urgent ? "!bg-pink-50 border-pink-200" : "bg-white"}`}>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 cursor-pointer select-none">
                <input type="checkbox" checked={item.is_urgent} onChange={() => toggleUrgent(item.id)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:!bg-red-500 relative transition-colors">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                </div>
                <span className={`text-xs ${item.is_urgent ? "text-red-600 font-semibold" : "text-gray-400"}`}>긴급</span>
              </label>

              <button
                onClick={() => {
                  setEditItem(item);
                  setOpenEdit(true);
                }}
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
                <span className={`text-xs px-2 py-1 rounded ${CATEGORY_COLOR[item.item.category]}`}>{CATEGORY_LABEL[item.item.category]}</span>
                <span className="text-xs px-2 py-1 rounded !bg-blue-100 text-blue-700">{STORAGE_LABEL[item.storage]}</span>
              </div>
            </div>

            {item.expiryDate && (
              <div className="text-xs">
                유통기한 {item.expiryDate.slice(0, 10)}{" "}
                <span className="ml-2 font-semibold text-orange-600">{dday(item.expiryDate)}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm">
                수량 <b>{item.quantity}</b>
              </div>
            </div>

            <button
              onClick={() => deleteItemHandler(item.id)}
              className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:!bg-red-500 transition"
              aria-label="삭제"
            >
              ✕
            </button>
          </div>
        ))}

        {openCreate && (
          <InventoryModal
            title="재고 등록"
            onClose={() => setOpenCreate(false)}
            onSubmit={(data) => {
              createItemHandler(data);
              setOpenCreate(false);
            }}
            itemList={itemList}
          />
        )}

        {openEdit && editItem && (
          <InventoryModal
            title="재고 수정"
            initialData={editItem}
            onClose={() => setOpenEdit(false)}
            onSubmit={(data) => {
              updateItemHandler(editItem.id, data);
              setOpenEdit(false);
            }}
            itemList={itemList}
          />
        )}
      </div>
    </div>
  );
}