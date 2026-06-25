# Expense Tracker

## Stack
- Frontend: React 19 + TypeScript + Vite + Shadcn/ui + TanStack Query + TanStack Table
- Backend: Bun + Elysia + Prisma
- Database: PostgreSQL 16

## Conventions
- Use Zod validate input at every boundary
- Never use `any` in TypeScript
- Business logic stays in service layer only
- Use TanStack Query for all data fetching
- Component names PascalCase, hooks start with `use`
- API response format: `{ data, error, message }`

## Project Structure
```
expense-tracker/
├── frontend/          # React SPA (Vite, port 5173)
├── backend/           # Elysia API (Bun, port 3000)
├── docker-compose.yml # PostgreSQL
└── package.json       # Bun workspace root
```

## CORS
- Frontend: http://localhost:5173
- Backend: http://localhost:3000