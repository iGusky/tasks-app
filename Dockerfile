FROM node:24.11.1-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:24.11.1-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.11.1-alpine AS prod
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "./dist/index.js"]