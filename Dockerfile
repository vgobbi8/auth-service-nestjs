# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the source code
COPY . .

# Build the Prisma client
RUN npx prisma generate

# Build the NestJS app (TypeScript to JavaScript)
RUN npm run build

# Stage 2: Run
FROM node:lts-alpine

WORKDIR /usr/src/app

# Copy dependencies and built code from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package*.json ./

# Expose port (match docker-compose)
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main.js"]
