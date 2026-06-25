import { useState, useMemo } from "react";
import { useTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilters";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { DeleteDialog } from "@/components/transaction/DeleteDialog";
import { QuickFilter } from "@/components/filter/QuickFilter";
import { DateRangePicker } from "@/components/filter/DateRangePicker";
import { TypeFilter } from "@/components/filter/TypeFilter";
import { CategoryFilter } from "@/components/filter/CategoryFilter";
import { Button } from "@/components/ui/button";
import type { CreateTransactionPayload, Transaction } from "@/types/transaction";

export function Transactions() {
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

  const { data: transactions = [], isLoading } = useTransactions(dateFilters);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  // Client-side filter by type and category
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (categoryFilter !== "all" && t.categoryId !== categoryFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const handleSubmit = (payload: CreateTransactionPayload) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, ...payload },
        { onSuccess: () => closeForm() }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => setShowForm(false) });
    }
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteMutation.mutate(deleting.id, {
      onSuccess: () => setDeleting(null),
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">Transactions</h1>
        <Button onClick={() => setShowForm(true)} size="sm" className="flex items-center gap-1">
          <span>+</span> เพิ่ม
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <QuickFilter preset={preset} onChange={setPreset} />
          <TypeFilter value={typeFilter} onChange={setTypeFilter} />
          <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} typeFilter={typeFilter} />
        </div>
        {preset === "custom" && (
          <DateRangePicker from={customFrom} to={customTo} onFromChange={setCustomFrom} onToChange={setCustomTo} />
        )}
      </div>

      {(showForm || editing) && (
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-3">
            {editing ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
          </h2>
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={closeForm}
            defaultValues={editing ?? undefined}
            isPending={isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="animate-pulse text-muted-foreground">กำลังโหลด...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">ไม่มีรายการที่ตรงกับตัวกรอง</p>
          <p className="text-sm">ลองเปลี่ยนตัวกรองหรือเพิ่มรายการใหม่</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <TransactionTable
            transactions={filteredTransactions}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        </div>
      )}

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