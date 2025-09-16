FROM --platform=linux/amd64 node:20.0.0-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:20.0.0-alpine AS server
WORKDIR /app
RUN apk add --no-cache git

RUN npm install -g pm2

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/build ./build
COPY ecosystem.config.js ./

EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
