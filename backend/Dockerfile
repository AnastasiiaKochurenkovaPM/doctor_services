FROM node:20

WORKDIR /index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800

CMD ["npm", "start"]
