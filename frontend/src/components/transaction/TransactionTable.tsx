import { TransactionRow } from "./TransactionRow";
import type { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  return (
    <>
      {/* Desktop: table view */}
      <div className="hidden sm:block overflow-x-auto">
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

      {/* Mobile: card view */}
      <div className="sm:hidden divide-y">
        {transactions.map((t) => {
          const isIncome = t.type === "INCOME";
          return (
            <div key={t.id} className="p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xl flex-shrink-0">{t.category.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.category.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.note ?? "-"} · {new Date(t.date).toLocaleDateString("th-TH", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-sm font-medium whitespace-nowrap ${isIncome ? "text-green-600" : "text-red-600"}`}>
                  {isIncome ? "+" : "-"}{new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0 }).format(t.amount)}
                </span>
                <button onClick={() => onEdit(t)} className="p-1 text-xs rounded hover:bg-accent">✏️</button>
                <button onClick={() => onDelete(t)} className="p-1 text-xs rounded hover:bg-red-100">🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}