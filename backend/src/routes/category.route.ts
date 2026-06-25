import { Elysia } from "elysia";
import { prisma } from "../prisma/client";

export const categoryRoute = new Elysia({ prefix: "/categories" })
  .get("/", async () => {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return { data: categories };
  });