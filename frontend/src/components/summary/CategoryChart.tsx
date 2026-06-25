import { formatCurrency } from "@/lib/utils";

interface CategoryItem {
  categoryId: string;
  categoryName: string;
  icon: string | null;
  total: number;
}

interface CategoryChartProps {
  items: CategoryItem[];
  total: number;
}

// Distinct colors for categories
const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#84cc16",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
  "#8b5cf6", "#a855f7", "#ec4899",
];

export function CategoryChart({ items, total }: CategoryChartProps) {
  const sorted = [...items].sort((a, b) => b.total - a.total);

  if (sorted.length === 0 || total === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        ไม่มีข้อมูลรายจ่าย
      </div>
    );
  }

  // SVG donut chart
  const radius = 80;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Donut chart */}
      <div className="relative flex-shrink-0">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {sorted.map((item, i) => {
            const pct = item.total / total;
            const dash = pct * circumference;
            const gap = circumference - dash;
            const color = COLORS[i % COLORS.length];
            const circle = (
              <circle
                key={item.categoryId}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">รวม</span>
          <span className="text-lg font-bold">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-1.5 w-full">
        {sorted.map((item, i) => {
          const pct = total > 0 ? (item.total / total) * 100 : 0;
          const color = COLORS[i % COLORS.length];
          return (
            <div key={item.categoryId} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="flex items-center gap-1 flex-1">
                {item.icon} {item.categoryName}
              </span>
              <span className="text-muted-foreground tabular-nums">
                {formatCurrency(item.total)}
              </span>
              <span className="text-muted-foreground text-xs w-10 text-right">
                {pct.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}