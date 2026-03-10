import { useEffect, useState } from "react"
import type { Category, Storage } from "../types/inventory"

export default function InventoryModal({
  title, onClose, onSubmit, initialData
}:any){
  
  const defaultForm = {
    name: "",
    quantity: 1,
    price: null as number | null,
    category: "VEG" as Category,
    storage: "R" as Storage,
    is_urgent: false,
    entryDate: "",
    expiryDate: "",
  }

  const toDateInput = (iso?: string | null) =>
    iso ? new Date(iso).toISOString().slice(0,10) : ""

  const [form,setForm] = useState(defaultForm)

  useEffect(()=>{
    if(!initialData) return

    setForm({
      name: initialData.name,
      quantity: initialData.quantity,
      price: initialData.price,
      category: initialData.category,
      storage: initialData.storage,
      is_urgent: initialData.is_urgent,
      entryDate: toDateInput(initialData.entryDate),
      expiryDate: toDateInput(initialData.expiryDate),
    })
},[initialData])

  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const change=(k:string,v:any)=>setForm({...form,[k]:v})

  const validate = () => {
    const newErrors: Record<string, boolean> = {}

    if (!form.name) newErrors.name = true
    if (!form.entryDate) newErrors.entryDate = true
    if (!form.quantity || form.quantity <= 0) newErrors.quantity = true

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit(form)
  }

  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-5 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold">{title}</h2>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">재고명</label>
          <input
            placeholder="재고명"
            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""}`}
            value={form.name}
            onChange={e=>change("name",e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">입고일</label>
          <input
            type="date"
            value={form.entryDate}
            onChange={e => change("entryDate", e.target.value)}
            className={`w-full p-2 border rounded ${errors.entryDate ? "border-red-500" : ""}`}
          />
        </div>

        {/* 유효일자 */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">유효일자</label>
          <input
            type="date"
            value={form.expiryDate}
            onChange={e => setForm({ ...form, expiryDate: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">수량</label>
          <input
            type="number"
            className={`w-full p-2 border rounded ${errors.quantity ? "border-red-500" : ""}`}
            value={form.quantity}
            onChange={e=>change("quantity",+e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">가격(원)</label>
          <input
            type="number"
            placeholder="가격"
            className="w-full p-2 border rounded"
            value={form.price ?? ""}
            onChange={e=>change("price", e.target.value === "" ? null : +e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">카테고리</label>
          <select
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={e=>change("category",e.target.value)}
          >
            <option value="VEG">야채</option>
            <option value="FRUIT">과일</option>
            <option value="SPICE">조미료</option>
            <option value="SAUCE">양념장</option>
            <option value="MEAT">고기</option>
            <option value="SNACK">간식</option>
            <option value="ETC">기타</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">보관방법</label>
          <select
            className="w-full p-2 border rounded"
            value={form.storage}
            onChange={e=>change("storage",e.target.value)}
          >
            <option value="R">냉장</option>
            <option value="F">냉동</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className={`text-sm ${form.is_urgent ? "text-red-600 font-semibold" : "text-gray-500"}`}>
            긴급
          </span>

          <input
            type="checkbox"
            checked={form.is_urgent}
            onChange={e=>change("is_urgent",e.target.checked)}
            className="sr-only peer"
          />

          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:!bg-red-500 relative transition-colors">
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </div>
        </label>

        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 p-2 border rounded">취소</button>
          <button
            onClick={handleSubmit}
            className="flex-1 p-2 rounded !bg-blue-600 text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}