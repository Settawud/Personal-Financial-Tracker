import { formatCurrency } from "@/lib/utils";

interface CategoryItem {
  categoryId: string;
  categoryName: string;
  icon: string | null;
  total: number;
}

interface SummaryBarProps {
  items: CategoryItem[];
  total: number;
}

export function SummaryBar({ items, total }: SummaryBarProps) {
  return (
    <div className="space-y-2">
      {items
        .sort((a, b) => b.total - a.total)
        .map((item) => {
          const pct = total > 0 ? (item.total / total) * 100 : 0;
          return (
            <div key={item.categoryId}>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  {item.icon} {item.categoryName}
                </span>
                <span className="text-muted-foreground">
                  {formatCurrency(item.total)} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}