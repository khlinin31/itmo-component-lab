FROM node:22-alpine

WORKDIR /app

COPY index.mjs /app/index.mjs

ENTRYPOINT ["node", "/app/index.mjs"]