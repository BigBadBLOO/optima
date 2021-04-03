FROM node:14-alpine as builder
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build

EXPOSE 8000
CMD ["node", "dist/src/main"]