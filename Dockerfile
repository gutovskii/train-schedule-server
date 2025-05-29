# Base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy files and install deps
COPY . .

RUN pnpm install
RUN npx prisma generate
RUN pnpm prisma migrate deploy
RUN pnpm run seed
RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]
