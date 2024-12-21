FROM node:22-alpine

WORKDIR /app

COPY . .
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

ENV NODE_ENV production

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 3000