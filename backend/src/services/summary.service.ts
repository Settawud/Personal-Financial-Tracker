import { prisma } from "../prisma/client";

export interface SummaryFilters {
  from?: string;
  to?: string;
}

export interface SummaryResult {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseByCategory: Array<{
    categoryId: string;
    categoryName: string;
    icon: string | null;
    total: number;
  }>;
}

export const summaryService = {
  async getSummary(filters?: SummaryFilters): Promise<SummaryResult> {
    const where: Record<string, unknown> = {};

    if (filters?.from || filters?.to) {
      where.date = {};
      if (filters.from) (where.date as Record<string, Date>).gte = new Date(filters.from);
      if (filters.to) (where.date as Record<string, Date>).lte = new Date(filters.to);
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: { category: true },
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const expenseMap = new Map<string, { categoryId: string; categoryName: string; icon: string | null; total: number }>();

    for (const t of transactions) {
      const amount = Number(t.amount.toString());

      if (t.type === "INCOME") {
        totalIncome += amount;
      } else {
        totalExpense += amount;

        const existing = expenseMap.get(t.categoryId);
        if (existing) {
          existing.total += amount;
        } else {
          expenseMap.set(t.categoryId, {
            categoryId: t.categoryId,
            categoryName: t.category.name,
            icon: t.category.icon,
            total: amount,
          });
        }
      }
    }

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      expenseByCategory: Array.from(expenseMap.values()),
    };
  },
};