import type { Elysia } from "elysia";

export const errorMiddleware = (app: Elysia) =>
  app.onError(({ code, error, set }) => {
    console.error(`[Error] ${code}:`, error.message);

    switch (code) {
      case "VALIDATION":
        set.status = 400;
        return {
          error: "Validation Error",
          message: error.message,
        };
      case "NOT_FOUND":
        set.status = 404;
        return {
          error: "Not Found",
          message: "ไม่พบข้อมูลที่ต้องการ",
        };
      default:
        set.status = 500;
        return {
          error: "Internal Server Error",
          message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        };
    }
  });