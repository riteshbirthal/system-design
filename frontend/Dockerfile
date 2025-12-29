# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --silent

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:1.27-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
