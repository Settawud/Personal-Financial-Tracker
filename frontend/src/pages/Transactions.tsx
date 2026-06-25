import { useState } from "react";
import { useTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from "@/hooks/useTransactions";
import { useDateFilter } from "@/hooks/useDateFilter";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { DeleteDialog } from "@/components/transaction/DeleteDialog";
import { QuickFilter } from "@/components/filter/QuickFilter";
import { DateRangePicker } from "@/components/filter/DateRangePicker";
import { Button } from "@/components/ui/button";
import type { CreateTransactionPayload, Transaction } from "@/types/transaction";

export function Transactions() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState<Transaction | null>(null);

  const { preset, setPreset, customFrom, setCustomFrom, customTo, setCustomTo, filters } = useDateFilter();

  const { data: transactions = [], isLoading } = useTransactions(filters);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

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

      <div className="space-y-2">
        <QuickFilter preset={preset} onChange={setPreset} />
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
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">ยังไม่มีรายการ</p>
          <p className="text-sm">คลิก "เพิ่มรายการ" เพื่อเริ่มบันทึกธุรกรรม</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <TransactionTable
            transactions={transactions}
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