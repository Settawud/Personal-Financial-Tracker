import { formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  variant: "income" | "expense" | "balance" | "negative";
}

const colorMap = {
  income: "border-green-200 bg-green-50 text-green-800",
  expense: "border-red-200 bg-red-50 text-red-800",
  balance: "border-blue-200 bg-blue-50 text-blue-800",
  negative: "border-red-300 bg-red-100 text-red-900",
};

export function SummaryCard({ title, value, icon, variant }: SummaryCardProps) {
  return (
    <div className={`rounded-lg border p-4 ${colorMap[variant]}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold mt-2">{formatCurrency(value)}</p>
    </div>
  );
}