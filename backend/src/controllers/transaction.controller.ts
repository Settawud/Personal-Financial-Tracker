import { transactionService } from "../services/transaction.service";
import type { CreateTransactionInput, UpdateTransactionInput, TransactionFilters } from "../services/transaction.service";

export const transactionController = {
  async list(query: TransactionFilters) {
    const transactions = await transactionService.findAll(query);
    return { data: transactions };
  },

  async getById(id: string) {
    const transaction = await transactionService.findById(id);
    if (!transaction) {
      return { error: "Transaction not found", message: "ไม่พบรายการ" };
    }
    return { data: transaction };
  },

  async create(input: CreateTransactionInput) {
    const transaction = await transactionService.create(input);
    return { data: transaction, message: "เพิ่มรายการสำเร็จ" };
  },

  async update(id: string, input: UpdateTransactionInput) {
    const transaction = await transactionService.findById(id);
    if (!transaction) {
      return { error: "Transaction not found", message: "ไม่พบรายการ" };
    }
    const updated = await transactionService.update(id, input);
    return { data: updated, message: "อัปเดตรายการสำเร็จ" };
  },

  async delete(id: string) {
    const transaction = await transactionService.findById(id);
    if (!transaction) {
      return { error: "Transaction not found", message: "ไม่พบรายการ" };
    }
    await transactionService.delete(id);
    return { message: "ลบรายการสำเร็จ" };
  },
};