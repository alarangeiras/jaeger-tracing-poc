FROM node:16-alpine3.11

COPY . .

RUN npm ci --prod

ENTRYPOINT [ "npm", "start" ]