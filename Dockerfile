# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Improve resilience against registry timeouts
ENV PNPM_REGISTRY=https://registry.npmjs.org/ \
  PNPM_FETCH_TIMEOUT=600000 \
  PNPM_FETCH_RETRIES=10 \
  PNPM_FETCH_RETRY_MINTIMEOUT=20000 \
  PNPM_FETCH_RETRY_MAXTIMEOUT=120000

# Mirror the environment configuration within pnpm itself
RUN pnpm config set registry ${PNPM_REGISTRY} \
  && pnpm config set fetch-timeout ${PNPM_FETCH_TIMEOUT} \
  && pnpm config set fetch-retries ${PNPM_FETCH_RETRIES} \
  && pnpm config set fetch-retry-mintimeout ${PNPM_FETCH_RETRY_MINTIMEOUT} \
  && pnpm config set fetch-retry-maxtimeout ${PNPM_FETCH_RETRY_MAXTIMEOUT}

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
