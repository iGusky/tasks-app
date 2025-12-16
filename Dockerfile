FROM node:24.11.1-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --prod

FROM node:24.11.1-alpine as build
WORKDIR /app
COPY . .
COPY --from=build /app/node_modules ./node_modules
RUN npm run build

FROM node:24.11.1-alpine
WORKDIR /app