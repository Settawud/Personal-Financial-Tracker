FROM oven/bun:1.3-alpine

WORKDIR /app

# Copy workspace root configs
COPY bun.lock package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies (triggers postinstall: prisma generate)
RUN cd backend && bun install --frozen-lockfile

# Copy source
COPY backend/ ./backend/

# Copy Prisma schema for runtime
COPY backend/prisma ./backend/prisma

# Generate Prisma client
RUN cd backend && bunx prisma generate

# Expose port
EXPOSE 3000

# Start
CMD ["bun", "run", "backend/src/index.ts"]