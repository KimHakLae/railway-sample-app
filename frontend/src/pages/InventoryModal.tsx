import { useState } from "react";
import type { InventoryWithItem } from "../types/inventory";
import type { Item } from "../types/item";

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
  const [isExistingItem, setIsExistingItem] = useState(!!initialData);

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
    setIsExistingItem(false); // ⭐ 신규 생성 → 활성화

    setItemList(prev => [...prev, newItem]);
    setForm(prev => ({
      ...prev,
      itemId: newId,
      itemName: newItem.name, // ← 여기서 추가
      category: newItem.category,
      isNewItem: true
    }));
    setNewItemName(""); // 입력 초기화
  };

  const handleSubmit = () => {
    if(!form.itemId) { alert("재고 항목을 선택해주세요"); return; }
    if(!form.quantity || form.quantity<=0) { alert("수량을 입력해주세요"); return; }
    if(!form.entryDate) { alert("입고일을 입력해주세요"); return; }

    console.log(form);
    // return;

    onSubmit({
      ...form,
      itemId: form.itemId,
      quantity: form.quantity,
      price: form.price ? Number(form.price) : undefined,
      entryDate: form.entryDate,
      expiryDate: form.expiryDate || undefined
    });
  };

  return (
    <div className="fixed inset-0 !bg-gray-400/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-full max-w-md space-y-3">
        <h2 className="text-lg font-bold">{title}</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">재고 항목</label>
          <div className="flex gap-2">
            {/* 재고 항목 */}
            <select
              className="flex-1 border rounded p-2"
              value={form.itemId}
              onChange={e => {
                const selectedId = Number(e.target.value);
                const selectedItem = itemList.find(i => i.id === selectedId);
                change("itemId", selectedId);
                change("itemName", selectedItem?.name || "");
              }}
            >
              {!initialData && <option value={0}>선택하세요</option>}
              {itemList.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="신규 항목"
              className="border rounded p-2 flex-1"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
            <button onClick={addNewItem} className="px-2 py-1 !bg-green-500 text-white rounded">추가</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">수량</label>
          <input type="number" className="w-full border rounded p-2" value={form.quantity} onChange={e=>change("quantity", Number(e.target.value))} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">가격</label>
          <input type="number" className="w-full border rounded p-2" value={form.price || ""} onChange={e=>change("price", e.target.value ? Number(e.target.value) : undefined)} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">카테고리</label>
          {/* 카테고리 */}
          <select
            className={`w-full p-2 border rounded transition
              ${isExistingItem
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white text-black"
              }`}
            value={form.category}
            onChange={e=>change("category",e.target.value)}
            disabled={isExistingItem}
          >
            {!form.category && <option value="">선택하세요</option>}
            <option value="VEG">야채</option>
            <option value="FRUIT">과일</option>
            <option value="SPICE">조미료</option>
            <option value="SAUCE">양념장</option>
            <option value="MEAT">고기</option>
            <option value="SNACK">간식</option>
            <option value="ETC">기타</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">보관</label>
          {/* 보관 */}
          <select
            className="w-full border rounded p-2"
            value={form.storage}
            onChange={e=>change("storage", e.target.value)}
          >
            {!initialData && <option value="">선택하세요</option>}
            <option value="R">냉장</option>
            <option value="F">냉동</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">입고일</label>
          <input type="date" className="w-full border rounded p-2" value={form.entryDate} onChange={e=>change("entryDate", e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">유통기한</label>
          <input type="date" className="w-full border rounded p-2" value={form.expiryDate} onChange={e=>change("expiryDate", e.target.value)} />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_urgent} onChange={e=>change("is_urgent", e.target.checked)} />
          <span className="text-sm">긴급</span>
        </label>

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">취소</button>
          <button onClick={handleSubmit} className="px-4 py-2 !bg-blue-600 text-white rounded">저장</button>
        </div>
      </div>
    </div>
  );
}