FROM node:18-alpine

WORKDIR /app/frontend

COPY  package*.json ./

RUN npm install
RUN npm install -g prisma

COPY . .

RUN npm run prisma:generate

EXPOSE 3000

CMD ["sh", "-c", " npm run prisma:push && npm run dev"]
