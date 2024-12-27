# Use the official Node.js runtime as the base image
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# write to production env as Vite will use this one for building
ARG API_URL
RUN touch .env.production
RUN echo "VITE_API_URL=$API_URL" >> .env.production

# Build the React app for production
RUN npm run build:prod

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]