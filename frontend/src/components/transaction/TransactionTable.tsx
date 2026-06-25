import { TransactionRow } from "./TransactionRow";
import type { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 font-medium">วันที่</th>
            <th className="text-left p-3 font-medium">หมวดหมู่</th>
            <th className="text-left p-3 font-medium">รายการ</th>
            <th className="text-right p-3 font-medium">จำนวน</th>
            <th className="text-center p-3 font-medium w-24">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}