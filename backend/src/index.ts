import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { transactionRoute } from "./routes/transaction.route";
import { summaryRoute } from "./routes/summary.route";
import { categoryRoute } from "./routes/category.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const PORT = process.env.PORT ?? 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = new Elysia()
  .use(errorMiddleware)
  .use(
    cors({
      origin: CORS_ORIGIN ? CORS_ORIGIN.split(",").map((s) => s.trim()) : false,
    })
  )
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .use(transactionRoute)
  .use(summaryRoute)
  .use(categoryRoute)
  .listen(PORT);

console.log(`🚀 Server running at http://localhost:${PORT}`);