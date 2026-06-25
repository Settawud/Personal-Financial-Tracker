FROM oven/bun:1.3-alpine

WORKDIR /app

# Copy workspace root configs
COPY bun.lock package.json ./
COPY backend/package.json ./backend/

# Install dependencies (ignore postinstall — prisma generate runs later with schema)
RUN cd backend && bun install --frozen-lockfile --ignore-scripts

# Copy source (including Prisma schema)
COPY backend/ ./backend/

# Generate Prisma client (schema is now available)
RUN cd backend && bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "backend/src/index.ts"]