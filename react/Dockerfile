# Stage 1: Build the React application
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build



EXPOSE 80

CMD ["npm", "start"]
