import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
  const isIncome = transaction.type === "INCOME";

  return (
    <tr className="border-b hover:bg-muted/30 transition-colors">
      <td className="p-3 whitespace-nowrap">{formatDate(transaction.date)}</td>
      <td className="p-3">
        <span className="flex items-center gap-1">
          {transaction.category.icon} {transaction.category.name}
        </span>
      </td>
      <td className="p-3 max-w-[200px] truncate">
        {transaction.note ?? "-"}
      </td>
      <td className={`p-3 text-right font-medium whitespace-nowrap ${isIncome ? "text-green-600" : "text-red-600"}`}>
        {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
      </td>
      <td className="p-3">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onEdit(transaction)}
            className="px-2 py-1 text-xs rounded hover:bg-accent transition-colors"
            title="แก้ไข"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(transaction)}
            className="px-2 py-1 text-xs rounded hover:bg-red-100 transition-colors"
            title="ลบ"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
}