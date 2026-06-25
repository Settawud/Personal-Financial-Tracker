import { Elysia, t } from "elysia";
import { summaryController } from "../controllers/summary.controller";

export const summaryRoute = new Elysia({ prefix: "/summary" })
  .get("/", async ({ query }) => {
    const result = await summaryController.getSummary({
      from: query.from as string | undefined,
      to: query.to as string | undefined,
    });
    return result;
  }, {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
    }),
  });