import { formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  variant: "income" | "expense" | "balance" | "negative";
}

const styles = {
  income: {
    card: "bg-gradient-to-br from-emerald-50 to-green-50/50 border-emerald-200/50",
    text: "text-emerald-700",
    value: "text-emerald-900",
  },
  expense: {
    card: "bg-gradient-to-br from-rose-50 to-red-50/50 border-rose-200/50",
    text: "text-rose-700",
    value: "text-rose-900",
  },
  balance: {
    card: "bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200/50",
    text: "text-blue-700",
    value: "text-blue-900",
  },
  negative: {
    card: "bg-gradient-to-br from-red-100 to-rose-50/50 border-red-300/50",
    text: "text-red-700",
    value: "text-red-900",
  },
};

export function SummaryCard({ title, value, icon, variant }: SummaryCardProps) {
  const s = styles[variant];
  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${s.card}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-xs font-medium ${s.text}`}>{title}</span>
        <span className="text-sm">{icon}</span>
      </div>
      <p className={`text-base sm:text-xl font-bold tabular-nums ${s.value}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}