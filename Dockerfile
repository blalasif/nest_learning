# Stage 1 - Build
FROM node:latest AS builder
WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
# Build the NestJS project
RUN npm run build

# Stage 2 - Production

FROM node:latest 
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production
EXPOSE 3000
CMD [ "node","dist/main" ]