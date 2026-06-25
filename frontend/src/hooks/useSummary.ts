import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SummaryResult } from "@/types/transaction";

export function useSummary(filters?: { from?: string; to?: string }) {
  return useQuery({
    queryKey: ["summary", filters],
    queryFn: async () => {
      const res = await api.summary.get(filters);
      return res.data as SummaryResult;
    },
  });
}