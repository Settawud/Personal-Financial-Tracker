import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

interface DeleteDialogProps {
  transaction: Transaction;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteDialog({ transaction, onConfirm, onCancel, isPending }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div
        className="bg-background rounded-lg border shadow-lg p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">ยืนยันการลบ</h3>
        <p className="text-sm text-muted-foreground mb-2">
          คุณต้องการลบรายการนี้ใช่หรือไม่?
        </p>
        <div className="bg-muted rounded-md p-2 mb-4 text-sm">
          <p>
            {transaction.category.icon} {transaction.category.name}
          </p>
          <p className="font-medium">
            {formatCurrency(transaction.amount)}
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            ยกเลิก
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending ? "กำลังลบ..." : "ลบ"}
          </Button>
        </div>
      </div>
    </div>
  );
}