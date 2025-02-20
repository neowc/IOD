# Build stage
FROM node:20.11.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
# Set ownership early
RUN chown -R node:node /app
# Switch to non-root user
USER node
# Install dependencies
RUN npm ci
# Copy source with correct ownership
COPY --chown=node:node . .
# Build the application
RUN npm run build

# Production stage
FROM node:20.11.1-alpine
WORKDIR /app
# Create directory and set ownership
RUN mkdir -p /app && chown -R node:node /app
# Switch to non-root user
USER node
# Copy built files and configs with correct ownership
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/package-lock.json ./
COPY --chown=node:node --from=builder /app/vite.config.js ./

# Install production dependencies
RUN npm ci && \
    npm cache clean --force

EXPOSE 8082
CMD ["npm", "start"]