FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm i

ENV NODE_ENV production

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 3000