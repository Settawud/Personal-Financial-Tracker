import type { Category } from "@/types/transaction";

// Hardcoded categories as fallback (when API unavailable)
// These match the seed data in backend/prisma/seed.ts
export const FALLBACK_CATEGORIES: Category[] = [
  { id: "fallback-food", name: "อาหาร", type: "EXPENSE", icon: "🍜" },
  { id: "fallback-transport", name: "เดินทาง", type: "EXPENSE", icon: "🚗" },
  { id: "fallback-housing", name: "ที่พัก", type: "EXPENSE", icon: "🏠" },
  { id: "fallback-health", name: "สุขภาพ", type: "EXPENSE", icon: "💊" },
  { id: "fallback-shopping", name: "ช้อปปิ้ง", type: "EXPENSE", icon: "🛍️" },
  { id: "fallback-entertainment", name: "บันเทิง", type: "EXPENSE", icon: "🎮" },
  { id: "fallback-other-expense", name: "อื่นๆ", type: "EXPENSE", icon: "📦" },
  { id: "fallback-salary", name: "เงินเดือน", type: "INCOME", icon: "💰" },
  { id: "fallback-freelance", name: "ฟรีแลนซ์", type: "INCOME", icon: "💻" },
  { id: "fallback-investment", name: "ลงทุน", type: "INCOME", icon: "📈" },
  { id: "fallback-other-income", name: "รายได้อื่นๆ", type: "INCOME", icon: "🎁" },
];