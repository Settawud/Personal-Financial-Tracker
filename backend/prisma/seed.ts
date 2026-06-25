import { PrismaClient, TxType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  // EXPENSE
  { name: "อาหาร", type: TxType.EXPENSE, icon: "🍜" },
  { name: "เดินทาง", type: TxType.EXPENSE, icon: "🚗" },
  { name: "ที่พัก", type: TxType.EXPENSE, icon: "🏠" },
  { name: "สุขภาพ", type: TxType.EXPENSE, icon: "💊" },
  { name: "ช้อปปิ้ง", type: TxType.EXPENSE, icon: "🛍️" },
  { name: "บันเทิง", type: TxType.EXPENSE, icon: "🎮" },
  { name: "อื่นๆ", type: TxType.EXPENSE, icon: "📦" },
  // INCOME
  { name: "เงินเดือน", type: TxType.INCOME, icon: "💰" },
  { name: "ฟรีแลนซ์", type: TxType.INCOME, icon: "💻" },
  { name: "ลงทุน", type: TxType.INCOME, icon: "📈" },
  { name: "รายได้อื่นๆ", type: TxType.INCOME, icon: "🎁" },
];

async function main() {
  console.log("Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log(`Seeded ${categories.length} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });