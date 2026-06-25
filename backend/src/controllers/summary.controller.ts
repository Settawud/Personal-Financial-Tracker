import { summaryService } from "../services/summary.service";
import type { SummaryFilters } from "../services/summary.service";

export const summaryController = {
  async getSummary(query: SummaryFilters) {
    const summary = await summaryService.getSummary(query);
    return { data: summary };
  },
};