#!/bin/bash

# ProjectMPA Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    ProjectMPA Deployment Script       ${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create necessary directories
echo -e "${YELLOW}Creating necessary directories...${NC}"
mkdir -p backend/uploads backend/logs docker/nginx/ssl

# Copy environment files
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}Creating backend .env file...${NC}"
    cp backend/.env.example backend/.env 2>/dev/null || echo "Please create backend/.env file"
fi

if [ ! -f frontend/.env ]; then
    echo -e "${YELLOW}Creating frontend .env file...${NC}"
    cp frontend/.env.example frontend/.env 2>/dev/null || echo "Please create frontend/.env file"
fi

# Build and deploy with Docker Compose
echo -e "${YELLOW}Building and starting containers...${NC}"
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml build --no-cache
docker-compose -f docker/docker-compose.yml up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}Checking service status...${NC}"
docker-compose -f docker/docker-compose.yml ps

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
docker-compose -f docker/docker-compose.yml exec -T backend node scripts/run-migrations.js

# Seed database (optional)
if [ "$1" == "--seed" ]; then
    echo -e "${YELLOW}Seeding database...${NC}"
    docker-compose -f docker/docker-compose.yml exec -T backend node scripts/seed-database.js
fi

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    Deployment Complete!                ${NC}"
echo -e "${GREEN}    Frontend: http://localhost          ${NC}"
echo -e "${GREEN}    Backend API: http://localhost/api   ${NC}"
echo -e "${GREEN}========================================${NC}"