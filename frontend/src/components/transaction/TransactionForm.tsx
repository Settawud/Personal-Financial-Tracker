import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import { formatDateInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Category, CreateTransactionPayload, Transaction } from "@/types/transaction";

interface TransactionFormProps {
  onSubmit: (payload: CreateTransactionPayload) => void;
  onCancel: () => void;
  defaultValues?: Transaction;
  isPending?: boolean;
}

export function TransactionForm({ onSubmit, onCancel, defaultValues, isPending }: TransactionFormProps) {
  const today = formatDateInput(new Date().toISOString());

  const [amount, setAmount] = useState(defaultValues?.amount?.toString() ?? "");
  const [type, setType] = useState<"INCOME" | "EXPENSE">(defaultValues?.type ?? "EXPENSE");
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId ?? "");
  const [note, setNote] = useState(defaultValues?.note ?? "");
  const [date, setDate] = useState(defaultValues?.date ? formatDateInput(defaultValues.date) : today);

  const { data: categoryData, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.categories.list();
      return res.data as Category[];
    },
    retry: 1,
  });

  // Use API data if available, otherwise use hardcoded fallback
  const categories = categoryData ?? (isError ? FALLBACK_CATEGORIES : []);
  const filteredCategories = categories.filter((c) => c.type === type);

  // Reset categoryId when type changes (EXPENSE↔INCOME)
  useEffect(() => {
    if (defaultValues) return;
    if (filteredCategories.length > 0) {
      setCategoryId(filteredCategories[0].id);
    } else {
      setCategoryId("");
    }
  }, [type]);

  useEffect(() => {
    if (defaultValues) {
      setAmount(defaultValues.amount.toString());
      setType(defaultValues.type);
      setCategoryId(defaultValues.categoryId);
      setNote(defaultValues.note ?? "");
      setDate(formatDateInput(defaultValues.date));
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    if (!categoryId) return;

    onSubmit({
      amount: numAmount,
      type,
      categoryId,
      note: note || undefined,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">ประเภท</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                type === "EXPENSE"
                  ? "bg-red-100 text-red-700 border-red-300 border"
                  : "bg-muted hover:bg-accent border border-transparent"
              }`}
            >
              รายจ่าย
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                type === "INCOME"
                  ? "bg-green-100 text-green-700 border-green-300 border"
                  : "bg-muted hover:bg-accent border border-transparent"
              }`}
            >
              รายรับ
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">จำนวน (บาท)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">หมวดหมู่</label>
          <select
            id="category"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          >
            <option value="">เลือกหมวดหมู่</option>
            {filteredCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">วันที่</label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium mb-1">หมายเหตุ (ไม่บังคับ)</label>
        <input
          id="note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          placeholder="เช่น ค่าอาหารกลางวัน"
        />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "กำลังบันทึก..." : defaultValues ? "บันทึก" : "เพิ่มรายการ"}
        </Button>
      </div>
    </form>
  );
}