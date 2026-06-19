# Multi-stage Dockerfile
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with FastAPI backend
FROM python:3.11-slim AS runner
WORKDIR /app

# Install system dependencies if any are needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ ./

# Copy built frontend static files to backend/static
COPY --from=frontend-builder /app/frontend/dist/ ./static/

# Cloud Run sets the PORT environment variable
ENV PORT=8080
ENV MODE=production
EXPOSE 8080

CMD ["python", "main.py"]
