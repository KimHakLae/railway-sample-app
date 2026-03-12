interface Props {
  total: number;
  urgent: number;
  qty: number;
}

export default function InventoryStats({ total, urgent, qty }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-sm">
      <div className="p-2 bg-white rounded border">
        전체
        <br />
        <b>{total}</b>
      </div>
      <div className="p-2 bg-white rounded border">
        긴급
        <br />
        <b className="text-red-500">{urgent}</b>
      </div>
      <div className="p-2 bg-white rounded border">
        총수량
        <br />
        <b>{qty}</b>
      </div>
    </div>
  );
}