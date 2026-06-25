import { useSummary } from "@/hooks/useSummary";
import { useDateFilter } from "@/hooks/useDateFilter";
import { SummaryCard } from "@/components/summary/SummaryCard";
import { CategoryChart } from "@/components/summary/CategoryChart";
import { QuickFilter } from "@/components/filter/QuickFilter";
import { DateRangePicker } from "@/components/filter/DateRangePicker";

export function Dashboard() {
  const { preset, setPreset, customFrom, setCustomFrom, customTo, setCustomTo, filters } = useDateFilter();
  const { data: summary, isLoading } = useSummary(filters);

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

      <div className="space-y-2">
        <QuickFilter preset={preset} onChange={setPreset} />
        {preset === "custom" && (
          <DateRangePicker from={customFrom} to={customTo} onFromChange={setCustomFrom} onToChange={setCustomTo} />
        )}
      </div>

      {isLoading ? (
        <div className="animate-pulse text-muted-foreground">กำลังโหลด...</div>
      ) : !summary ? (
        <p className="text-muted-foreground">ไม่มีข้อมูล</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard title="รายได้" value={summary.totalIncome} icon="💰" variant="income" />
            <SummaryCard title="รายจ่าย" value={summary.totalExpense} icon="💸" variant="expense" />
            <SummaryCard title="คงเหลือ" value={summary.balance} icon="📊" variant={summary.balance >= 0 ? "balance" : "negative"} />
          </div>

          {summary.expenseByCategory.length > 0 && (
            <div className="bg-card rounded-lg border p-4">
              <h2 className="text-lg font-semibold mb-3">รายจ่ายตามหมวดหมู่</h2>
              <CategoryChart items={summary.expenseByCategory} total={summary.totalExpense} />
            </div>
          )}
        </>
      )}
    </div>
  );
}