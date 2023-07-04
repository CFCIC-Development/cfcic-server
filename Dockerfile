# Build for development

FROM node:18 AS dev
WORKDIR /app
COPY package*.json ./

RUN apt-get update
RUN apt-get -y install \
    cmake

RUN npm install --quiet
COPY . .

RUN npm run build
RUN npx prisma generate
COPY . ./

# Migrate database in production
FROM node:18-alpine3.17 AS migrate
WORKDIR /app
COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npx prisma db seed

# Deploy production image
FROM migrate AS production
WORKDIR /app

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start:prod"]
