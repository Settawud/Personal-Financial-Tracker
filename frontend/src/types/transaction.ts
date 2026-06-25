export type TxType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  type: TxType;
  icon: string | null;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TxType;
  category: Category;
  categoryId: string;
  note: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  amount: number;
  type: TxType;
  categoryId: string;
  note?: string;
  date: string;
}

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;

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

export interface TransactionFilters {
  from?: string;
  to?: string;
}