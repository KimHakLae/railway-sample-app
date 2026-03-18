import InventoryItemCard from "./InventoryItemCard";
import type { StockWithIngredient } from "../../types/stock";

interface Props {
  items: StockWithIngredient[];
  toggleUrgent: (id: number) => void;
  confirmDeleteHandler: (id: number) => void;
  setEditItem: (item: StockWithIngredient) => void;
  setOpenEdit: (v: boolean) => void;
}

export default function InventoryList({ items, toggleUrgent, confirmDeleteHandler, setEditItem, setOpenEdit }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <InventoryItemCard key={item.id} item={item} toggleUrgent={toggleUrgent} confirmDeleteHandler={confirmDeleteHandler} setEditItem={setEditItem} setOpenEdit={setOpenEdit} />
      ))}
    </div>
  );
}