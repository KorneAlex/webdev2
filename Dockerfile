# webdev2 – Node.js Hapi app
FROM node:20-alpine

WORKDIR /app

# Install dependencies from lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

EXPOSE 3000

# Run as non-root
USER node

CMD ["node", "server.js"]
