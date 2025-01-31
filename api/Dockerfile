FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM node:22-alpine AS runner

ARG JWT_SECRET
ARG ORIGIN
ARG NODE_ENV=production

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i --omit=dev

COPY --from=build /app/dist /app/

ENV JWT_SECRET $JWT_SECRET
ENV ORIGIN $ORIGIN
ENV NODE_ENV $NODE_ENV

CMD ["node", "src/main.js" ]

EXPOSE 3000