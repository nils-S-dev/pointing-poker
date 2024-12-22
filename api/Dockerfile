FROM node:22-alpine

WORKDIR /app

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ARG CLIENT_URL
ENV CLIENT_URLT=$CLIENT_URL

COPY . .
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

ENV NODE_ENV production

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 3000