import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().positive("จำนวนต้องมากกว่า 0"),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  note: z.string().optional(),
  date: z.string().min(1, "กรุณาระบุวันที่"),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const transactionQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});