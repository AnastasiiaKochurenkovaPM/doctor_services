# Step 1: Build the React app
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build  # ця команда створює папку dist

# Step 2: Serve the app using nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
