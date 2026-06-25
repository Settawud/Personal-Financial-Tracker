import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { FALLBACK_CATEGORIES } from "@/lib/constants";
import type { Category } from "@/types/transaction";
import type { TxTypeFilter } from "@/hooks/useTransactionFilters";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  typeFilter?: TxTypeFilter;
}

export function CategoryFilter({ value, onChange, typeFilter }: CategoryFilterProps) {
  const { data: categoryData, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.categories.list();
      return res.data as Category[];
    },
    retry: 1,
  });

  const categories = categoryData ?? (isError ? FALLBACK_CATEGORIES : []);
  const filtered = typeFilter === "all" ? categories : categories.filter((c) => c.type === typeFilter);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-input px-3 py-1.5 text-sm bg-background"
    >
      <option value="all">ทุกหมวดหมู่</option>
      {filtered.map((c) => (
        <option key={c.id} value={c.id}>
          {c.icon} {c.name}
        </option>
      ))}
    </select>
  );
}