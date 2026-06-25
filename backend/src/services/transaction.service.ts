import { prisma } from "../prisma/client";
import type { TxType } from "@prisma/client";

export interface CreateTransactionInput {
  amount: number;
  type: TxType;
  categoryId: string;
  note?: string;
  date: string;
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

export interface TransactionFilters {
  from?: string;
  to?: string;
}

function toNumber(amount: { toString(): string }): number {
  return Number(amount.toString());
}

export const transactionService = {
  async findAll(filters?: TransactionFilters) {
    const where: Record<string, unknown> = {};

    if (filters?.from || filters?.to) {
      where.date = {};
      if (filters.from) (where.date as Record<string, Date>).gte = new Date(filters.from);
      if (filters.to) (where.date as Record<string, Date>).lte = new Date(filters.to);
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: { date: "desc" },
    });

    return transactions.map((t) => ({
      ...t,
      amount: toNumber(t.amount),
    }));
  },

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!transaction) return null;

    return {
      ...transaction,
      amount: toNumber(transaction.amount),
    };
  },

  async create(input: CreateTransactionInput) {
    const transaction = await prisma.transaction.create({
      data: {
        amount: input.amount,
        type: input.type,
        categoryId: input.categoryId,
        note: input.note ?? null,
        date: new Date(input.date),
      },
      include: { category: true },
    });

    return {
      ...transaction,
      amount: toNumber(transaction.amount),
    };
  },

  async update(id: string, input: UpdateTransactionInput) {
    const data: Record<string, unknown> = {};
    if (input.amount !== undefined) data.amount = input.amount;
    if (input.type !== undefined) data.type = input.type;
    if (input.categoryId !== undefined) data.categoryId = input.categoryId;
    if (input.note !== undefined) data.note = input.note;
    if (input.date !== undefined) data.date = new Date(input.date);

    const transaction = await prisma.transaction.update({
      where: { id },
      data,
      include: { category: true },
    });

    return {
      ...transaction,
      amount: toNumber(transaction.amount),
    };
  },

  async delete(id: string) {
    await prisma.transaction.delete({ where: { id } });
  },
};