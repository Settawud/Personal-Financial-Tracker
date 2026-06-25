import type { TxTypeFilter } from "@/hooks/useTransactionFilters";

interface TypeFilterProps {
  value: TxTypeFilter;
  onChange: (value: TxTypeFilter) => void;
}

const options: Array<{ id: TxTypeFilter; label: string }> = [
  { id: "all", label: "ทั้งหมด" },
  { id: "INCOME", label: "รายรับ" },
  { id: "EXPENSE", label: "รายจ่าย" },
];

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            value === opt.id
              ? opt.id === "INCOME"
                ? "bg-green-100 text-green-700"
                : opt.id === "EXPENSE"
                ? "bg-red-100 text-red-700"
                : "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-accent"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}