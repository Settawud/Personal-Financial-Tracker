# Expense Tracker

Personal Financial Tracker — บันทึกรายรับ-รายจ่ายส่วนบุคคล

## Tech Stack
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + TanStack Query
- **Backend:** Bun + Elysia + Prisma
- **Database:** SQLite (dev) / PostgreSQL (prod-ready)

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) >= 1.3
- (Optional) Docker for PostgreSQL

### Setup

```bash
# Clone & install
bun install

# Setup database
cd backend
cp .env.example .env        # Edit if needed
bunx prisma db push         # Create tables
bun run prisma/seed.ts      # Seed categories

# Start backend (port 3000)
bun run dev

# Start frontend (port 5173) — in another terminal
cd ../frontend
bun run dev
```

### Docker (PostgreSQL alternative)
```bash
docker compose up -d
# Update backend/.env DATABASE_URL to postgresql://...
bun run prisma migrate dev
```

## Project Structure
```
├── frontend/              # React SPA (Vite)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom hooks (TanStack Query)
│   │   ├── lib/           # API client, utilities
│   │   ├── pages/         # Dashboard, Transactions
│   │   └── types/         # Shared TypeScript types
│   └── vite.config.ts
├── backend/               # Elysia API (Bun)
│   ├── src/
│   │   ├── routes/        # Route definitions
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── middlewares/    # Error handling, validation (Zod)
│   │   └── prisma/        # Database client
│   └── prisma/
│       ├── schema.prisma  # Database schema
│       └── seed.ts        # Seed data
├── docker-compose.yml     # PostgreSQL
├── CLAUDE.md              # Agent context
└── package.json           # Monorepo root
```

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /transactions | List all (?from=&to=) |
| POST | /transactions | Create transaction |
| PUT | /transactions/:id | Update transaction |
| DELETE | /transactions/:id | Delete transaction |
| GET | /summary | Summary (?from=&to=) |
| GET | /categories | List categories |

## Conventions
- Zod validation at every API boundary
- Never use `any` in TypeScript
- Business logic in service layer only
- TanStack Query for all data fetching
- Component names PascalCase, hooks start with `use`
- API response: `{ data, error, message }`