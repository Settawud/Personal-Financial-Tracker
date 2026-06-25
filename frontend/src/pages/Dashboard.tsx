import { useState, useMemo } from "react";
import { useSummary } from "@/hooks/useSummary";
import { useTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilters";
import { SummaryCard } from "@/components/summary/SummaryCard";
import { CategoryChart } from "@/components/summary/CategoryChart";
import { QuickFilter } from "@/components/filter/QuickFilter";
import { DateRangePicker } from "@/components/filter/DateRangePicker";
import { TypeFilter } from "@/components/filter/TypeFilter";
import { CategoryFilter } from "@/components/filter/CategoryFilter";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { DeleteDialog } from "@/components/transaction/DeleteDialog";
import { Button } from "@/components/ui/button";
import type { CreateTransactionPayload, Transaction } from "@/types/transaction";

export function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState<Transaction | null>(null);

  const {
    preset, setPreset,
    customFrom, setCustomFrom,
    customTo, setCustomTo,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    dateFilters,
  } = useTransactionFilters();

  const { data: summary, isLoading: summaryLoading } = useSummary(dateFilters);
  const { data: transactions = [], isLoading: txLoading } = useTransactions(dateFilters);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (categoryFilter !== "all" && t.categoryId !== categoryFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const handleSubmit = (payload: CreateTransactionPayload) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...payload }, { onSuccess: closeForm });
    } else {
      createMutation.mutate(payload, { onSuccess: () => setShowForm(false) });
    }
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteMutation.mutate(deleting.id, { onSuccess: () => setDeleting(null) });
  };

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-semibold text-sm sm:text-base">Expense Tracker</span>
          </div>
          <Button
            onClick={() => { setEditing(null); setShowForm(true); }}
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            + เพิ่มรายการ
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary Cards */}
        {summaryLoading ? (
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 sm:h-28 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : summary ? (
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <SummaryCard title="รายได้" value={summary.totalIncome} icon="💰" variant="income" />
            <SummaryCard title="รายจ่าย" value={summary.totalExpense} icon="💸" variant="expense" />
            <SummaryCard title="คงเหลือ" value={summary.balance} icon="📊" variant={summary.balance >= 0 ? "balance" : "negative"} />
          </div>
        ) : null}

        {/* Donut Chart */}
        {summary && summary.expenseByCategory.length > 0 && (
          <div className="bg-card rounded-xl border shadow-sm p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">รายจ่ายตามหมวดหมู่</h2>
            <CategoryChart items={summary.expenseByCategory} total={summary.totalExpense} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <QuickFilter preset={preset} onChange={setPreset} />
          <div className="h-5 w-px bg-border" />
          <TypeFilter value={typeFilter} onChange={setTypeFilter} />
          <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} typeFilter={typeFilter} />
          {preset === "custom" && (
            <DateRangePicker from={customFrom} to={customTo} onFromChange={setCustomFrom} onToChange={setCustomTo} />
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-card rounded-xl border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">
                {editing ? "✏️ แก้ไขรายการ" : "➕ เพิ่มรายการใหม่"}
              </h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
            </div>
            <TransactionForm
              onSubmit={handleSubmit}
              onCancel={closeForm}
              defaultValues={editing ?? undefined}
              isPending={isPending}
            />
          </div>
        )}

        {/* Transaction List */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b">
            <h2 className="text-sm font-semibold text-muted-foreground">
              รายการทั้งหมด {filteredTransactions.length > 0 && `(${filteredTransactions.length})`}
            </h2>
          </div>
          {txLoading ? (
            <div className="p-6 text-center text-muted-foreground text-sm animate-pulse">กำลังโหลด...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p className="text-3xl mb-2">📝</p>
              <p className="text-sm">ยังไม่มีรายการ</p>
              <p className="text-xs mt-1">กด "เพิ่มรายการ" เพื่อเริ่มบันทึก</p>
            </div>
          ) : (
            <TransactionTable
              transactions={filteredTransactions}
              onEdit={(t) => { setEditing(t); setShowForm(true); }}
              onDelete={setDeleting}
            />
          )}
        </div>
      </main>

      {/* Delete Dialog */}
      {deleting && (
        <DeleteDialog
          transaction={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  );
}