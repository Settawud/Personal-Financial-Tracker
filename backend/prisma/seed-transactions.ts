import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get all categories
  const categories = await prisma.category.findMany();

  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");
  const incomeCategories = categories.filter((c) => c.type === "INCOME");

  // Sample transactions — spread across June 2026
  const transactions = [
    { amount: 150, type: "EXPENSE" as const, note: "ข้าวกลางวัน", date: "2026-06-25" },
    { amount: 80, type: "EXPENSE" as const, note: "กาแฟตอนเช้า", date: "2026-06-25" },
    { amount: 1200, type: "EXPENSE" as const, note: "ค่าของชำที่โลตัส", date: "2026-06-24" },
    { amount: 350, type: "EXPENSE" as const, note: "ค่ารถไฟฟ้า BTS", date: "2026-06-24" },
    { amount: 500, type: "EXPENSE" as const, note: "ค่ายา", date: "2026-06-23" },
    { amount: 2500, type: "EXPENSE" as const, note: "ค่าเช่าห้อง", date: "2026-06-22" },
    { amount: 450, type: "EXPENSE" as const, note: "อาหารเย็นวันศุกร์", date: "2026-06-20" },
    { amount: 650, type: "EXPENSE" as const, note: "ค่าจอดรถ", date: "2026-06-18" },
    { amount: 180, type: "EXPENSE" as const, note: "ขนม", date: "2026-06-17" },
    { amount: 320, type: "EXPENSE" as const, note: "ค่าส่งของ", date: "2026-06-15" },
    { amount: 990, type: "EXPENSE" as const, note: "ซื้อเกม Steam", date: "2026-06-14" },
    { amount: 1500, type: "EXPENSE" as const, note: "ซื้อรองเท้าใหม่", date: "2026-06-12" },
    { amount: 220, type: "EXPENSE" as const, note: "ซื้อหนังสือ", date: "2026-06-10" },
    { amount: 85, type: "EXPENSE" as const, note: "น้ำเปล่า", date: "2026-06-08" },
    { amount: 420, type: "EXPENSE" as const, note: null, date: "2026-06-05" },

    { amount: 50000, type: "INCOME" as const, note: "เงินเดือน มิ.ย.", date: "2026-06-30" },
    { amount: 15000, type: "INCOME" as const, note: "ฟรีแลนซ์ ทำเว็บ", date: "2026-06-20" },
    { amount: 2000, type: "INCOME" as const, note: "ปันผลหุ้น", date: "2026-06-15" },
    { amount: 5000, type: "INCOME" as const, note: "โปรเจกต์พิเศษ", date: "2026-06-10" },
    { amount: 800, type: "INCOME" as const, note: "ของขวัญวันเกิด", date: "2026-06-05" },
  ];

  // Seed transactions — clear existing first
  await prisma.transaction.deleteMany();

  for (const t of transactions) {
    const pool = t.type === "EXPENSE" ? expenseCategories : incomeCategories;
    const category = pool[Math.floor(Math.random() * pool.length)];

    await prisma.transaction.create({
      data: {
        amount: t.amount,
        type: t.type,
        categoryId: category.id,
        note: t.note,
        date: new Date(t.date),
      },
    });
  }

  const count = await prisma.transaction.count();
  console.log(`✅ Seeded ${count} transactions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });