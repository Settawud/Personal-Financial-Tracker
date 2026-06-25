import { useState, useMemo } from "react";
import { subDays, startOfMonth, startOfYear, format, endOfDay, startOfDay } from "date-fns";

export type FilterPreset = "all" | "today" | "7days" | "30days" | "thisMonth" | "thisYear" | "custom";
export type TxTypeFilter = "all" | "INCOME" | "EXPENSE";

export function useTransactionFilters() {
  const [preset, setPreset] = useState<FilterPreset>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const dateFilters = useMemo(() => {
    if (preset === "all") return {};

    const today = new Date();

    switch (preset) {
      case "today":
        return {
          from: format(startOfDay(today), "yyyy-MM-dd"),
          to: format(endOfDay(today), "yyyy-MM-dd"),
        };
      case "7days":
        return {
          from: format(startOfDay(subDays(today, 7)), "yyyy-MM-dd"),
          to: format(endOfDay(today), "yyyy-MM-dd"),
        };
      case "30days":
        return {
          from: format(startOfDay(subDays(today, 30)), "yyyy-MM-dd"),
          to: format(endOfDay(today), "yyyy-MM-dd"),
        };
      case "thisMonth":
        return {
          from: format(startOfMonth(today), "yyyy-MM-dd"),
          to: format(endOfDay(today), "yyyy-MM-dd"),
        };
      case "thisYear":
        return {
          from: format(startOfYear(today), "yyyy-MM-dd"),
          to: format(endOfDay(today), "yyyy-MM-dd"),
        };
      case "custom":
        return {
          from: customFrom || undefined,
          to: customTo || undefined,
        };
    }
  }, [preset, customFrom, customTo]);

  return {
    preset, setPreset,
    customFrom, setCustomFrom,
    customTo, setCustomTo,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    dateFilters,
  };
}