import { useState } from "react";
import type { InventoryWithItem } from "../../types/inventory";
import type { Item } from "../../types/item";
import { useSnackbar } from "../ui/SnackbarProvider";
import { CATEGORY_INFO, STORAGE_INFO } from "../../constants/categoryConstants";

interface InventoryModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (data: {
    itemId: number;
    quantity: number;
    price?: number;
    category?: string;
    storage?: string;
    is_urgent: boolean;
    entryDate: string;
    expiryDate?: string;
  }) => void;
  itemList: Item[];
  initialData?: InventoryWithItem;
}

export default function InventoryModal({
  title,
  onClose,
  onSubmit,
  itemList: initialItemList,
  initialData,
}: InventoryModalProps) {
  const [itemList, setItemList] = useState<Item[]>(initialItemList);
  const [newItemName, setNewItemName] = useState(""); // 신규항목 입력
  const [form, setForm] = useState({
    itemId: initialData?.item.id || 0, // 신규이면 0
    itemName: initialData?.item.name || "", // ← 추가
    quantity: initialData?.quantity || 1,
    price: initialData?.price ?? undefined,
    category: initialData?.item.category || "", // ""이면 선택하세요
    storage: initialData?.storage || "", // ""이면 선택하세요
    is_urgent: initialData?.is_urgent || false,
    entryDate: initialData?.entryDate?.slice(0,10) || new Date().toISOString().slice(0,10),
    expiryDate: initialData?.expiryDate?.slice(0,10) || ""
  });
  const [newItemIds, setNewItemIds] = useState<number[]>([]);
  const [isNewItem, setIsNewItem] = useState(false);
  const [itmSearch, setItmSearch] = useState(""); // 품목 검색어
  const { showSnackbar } = useSnackbar();

  const filteredItems = useMemo(() => {
    if (!itmSearch.trim()) return itemList;
    return itemList.filter(i => i.name.toLowerCase().includes(itmSearch.toLowerCase()));
  }, [itemList, itmSearch]);

  const change = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // 신규 항목 등록
  const addNewItem = () => {
    if (!newItemName.trim()) return;
    const newId = Math.max(0, ...itemList.map(i => i.id)) + 1; // 간단한 ID 생성
    const newItem: Item = {
      id: newId,
      name: newItemName.trim(),
      category: "ETC",
    };
    // setIsExistingItem(false); // ⭐ 신규 생성 → 활성화

    setItemList(prev => [...prev, newItem]);
    setForm(prev => ({
      ...prev,
      itemId: newId,
      itemName: newItem.name, // ← 여기서 추가
      category: newItem.category,
      isNewItem: true
    }));
    setNewItemIds(prev => [...prev, newId]); // ⭐ 핵심
    setIsNewItem(true); // ⭐ 신규 항목 선택
    setNewItemName(""); // 입력 초기화
    showSnackbar("신규 항목이 추가되었습니다", {type: "success"});
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!form.itemId) newErrors.itemId = "재고 항목을 선택해주세요";
    if (!form.quantity || form.quantity <= 0) newErrors.quantity = "수량을 입력해주세요";
    if (!form.entryDate) newErrors.entryDate = "입고일을 입력해주세요";
    if (!form.storage) newErrors.storage = "보관방법을 선택해주세요";

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      showSnackbar(firstError, {type: "error"});

      return;
    }

    onSubmit({
      ...form,
      itemId: form.itemId,
      quantity: form.quantity,
      price: form.price ? Number(form.price) : undefined,
      entryDate: form.entryDate,
      expiryDate: form.expiryDate || undefined
    });
    // showSnackbar("저장되었습니다", "success");
  };

  return (
    <div className="fixed inset-0 z-60 !bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center">
      
      {/* 모달 */}
      <div className="
        w-full sm:max-w-md
        h-[92vh] sm:h-auto
        !bg-[#f8fafc]
        rounded-t-3xl sm:rounded-3xl
        flex flex-col shadow-2xl
      ">

        {/* 헤더 */}
        <div className="p-5 pb-3">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">재고 정보를 입력하세요</p>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">

          {/* 재고 항목 카드 */}
          <section className="!bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              📦 재고 항목
            </label>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="품목 검색..."
                  className="w-full border rounded-xl p-3 text-sm !bg-gray-50 focus:ring-2 focus:ring-brand-500 transition-all pl-10"
                  value={itmSearch}
                  onChange={e => setItmSearch(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>

              <select
                className="w-full border rounded-xl p-3 text-base !bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                value={form.itemId}
                onChange={e => {
                  const selectedId = Number(e.target.value);
                  const selectedItem = itemList.find(i => i.id === selectedId);
                  change("itemId", selectedId);
                  change("itemName", selectedItem?.name || "");
                  change("category", selectedItem?.category || "");

                  const isNew = newItemIds.includes(selectedId);
                  setIsNewItem(isNew); // ⭐ ID 기준 판별
                }}
              >
                {!initialData && <option value={0}>항목 선택 ({filteredItems.length})</option>}
                {filteredItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="새 항목 이름"
                className="flex-1 border rounded-xl p-3 !bg-gray-50"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
              />
              <button
                onClick={addNewItem}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-gradient-to-r from-emerald-500 to-emerald-600
                  text-white
                  font-semibold
                  shadow-md
                  transition
                  hover:from-emerald-600 hover:to-emerald-700
                  active:scale-95
                "
              >
                추가
              </button>
            </div>
          </section>

          {/* 수량 가격 카드 */}
          <section className="!bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">수량</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 !bg-gray-50"
                  value={form.quantity}
                  onChange={e=>change("quantity", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">가격</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 !bg-gray-50"
                  value={form.price || ""}
                  onChange={e=>change("price", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          </section>

          {/* 분류 카드 */}
          <section className="!bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">카테고리</label>
              <select
                className={`w-full p-3 border rounded-lg ${
                  !isNewItem
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white"
                }`}
                value={form.category}
                onChange={e => change("category", e.target.value)}
                disabled={!isNewItem}
              >
                {!form.category && <option value="">선택하세요</option>}

                {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">보관 방법</label>
              <select
                className="w-full border rounded-xl p-3 !bg-gray-50"
                value={form.storage}
                onChange={e=>change("storage", e.target.value)}
              >
                {!initialData && <option value="">선택하세요</option>}

                {Object.entries(STORAGE_INFO).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* 날짜 카드 */}
          <section className="!bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">입고일</label>
              <input
                type="date"
                className="w-full border rounded-xl p-3 !bg-gray-50"
                value={form.entryDate}
                onChange={e => change("entryDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">유통기한</label>
              <input
                type="date"
                className="w-full border rounded-xl p-3 !bg-gray-50"
                value={form.expiryDate}
                onChange={e => change("expiryDate", e.target.value)}
              />
            </div>
          </section>

          {/* 긴급 토글 */}
          <section className="!bg-white rounded-2xl p-4 shadow-sm">
            <label className="flex items-center justify-between">
              <span className="font-medium flex items-center gap-2">
                🚨 긴급 표시
              </span>
              <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.is_urgent}
                    onChange={e=>change("is_urgent", e.target.checked)}
                    className="sr-only peer"
                  />

                  {/* 트랙 */}
                  <div className="
                    w-12 h-7
                    bg-gray-300
                    rounded-full
                    peer-checked:bg-red-500
                    transition-colors
                  "></div>

                  {/* 동그라미 */}
                  <div className="
                    absolute top-1 left-1
                    w-5 h-5
                    bg-white rounded-full shadow
                    transition-transform
                    peer-checked:translate-x-5
                  "></div>
                </div>
            </label>
          </section>

        </div>

        {/* 하단 버튼바 */}
        <div className="p-4 border-t !bg-white flex gap-3">
          {/* 취소 버튼 */}
          <button
            onClick={onClose}
            className="
              flex-1 py-3
              border border-gray-300
              rounded-xl
              bg-white
              text-gray-700
              font-medium
              shadow-sm
              transition
              hover:bg-gray-50
              hover:shadow
              active:scale-95
            "
          >
            취소
          </button>

          {/* 저장 버튼 */}
          <button
            onClick={handleSubmit}
            className="
              flex-1 py-3
              rounded-xl
              bg-gradient-to-r from-blue-500 to-blue-600
              text-white
              font-semibold
              shadow-lg
              transition
              hover:from-blue-600 hover:to-blue-700
              active:scale-95
            "
          >
            저장
          </button>
        </div>

      </div>
    </div>
  );
}