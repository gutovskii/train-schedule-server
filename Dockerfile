# Base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy files and install deps
COPY . .

RUN pnpm install
RUN npx prisma generate
RUN pnpm run build
RUN pnpm run seed

CMD ["pnpm", "run", "start:prod"]
