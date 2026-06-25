import { Elysia, t } from "elysia";
import { transactionController } from "../controllers/transaction.controller";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../middlewares/validate.middleware";

export const transactionRoute = new Elysia({ prefix: "/transactions" })
  .get("/", async ({ query }) => {
    const result = await transactionController.list({
      from: query.from as string | undefined,
      to: query.to as string | undefined,
    });
    return result;
  }, {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
    }),
  })

  .get("/:id", async ({ params: { id } }) => {
    const result = await transactionController.getById(id);
    return result;
  }, {
    params: t.Object({
      id: t.String(),
    }),
  })

  .post("/", async ({ body }) => {
    const parsed = createTransactionSchema.parse(body);
    const result = await transactionController.create(parsed);
    return result;
  }, {
    body: t.Object({
      amount: t.Number(),
      type: t.Union([t.Literal("INCOME"), t.Literal("EXPENSE")]),
      categoryId: t.String(),
      note: t.Optional(t.String()),
      date: t.String(),
    }),
  })

  .put("/:id", async ({ params: { id }, body }) => {
    const parsed = updateTransactionSchema.parse(body);
    const result = await transactionController.update(id, parsed);
    return result;
  }, {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      amount: t.Optional(t.Number()),
      type: t.Optional(t.Union([t.Literal("INCOME"), t.Literal("EXPENSE")])),
      categoryId: t.Optional(t.String()),
      note: t.Optional(t.String()),
      date: t.Optional(t.String()),
    }),
  })

  .delete("/:id", async ({ params: { id } }) => {
    const result = await transactionController.delete(id);
    return result;
  }, {
    params: t.Object({
      id: t.String(),
    }),
  });