FROM node:21-alpine3.18
WORKDIR /React/frontend

COPY ./frontend/package.json .

RUN npm i

COPY frontend/ .

RUN npm run watch

CMD ["npm", "run", "start" ]