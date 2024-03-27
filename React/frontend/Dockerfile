FROM node:21-alpine3.18 as build-stage

WORKDIR /app/

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf