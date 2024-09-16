FROM --platform=linux/amd64 node:18.20.4-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:18.20.4-alpine AS server
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/build ./build
EXPOSE 3000
CMD ["npm", "run", "start"]
