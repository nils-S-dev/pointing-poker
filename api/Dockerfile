FROM node:22-alpine

ARG JWT_SECRET
ARG ORIGIN
ARG NODE_ENV

WORKDIR /app

COPY . .

RUN npm i

ENV JWT_SECRET $JWT_SECRET
ENV ORIGIN $ORIGIN
ENV NODE_ENV $NODE_ENV

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

EXPOSE 3000