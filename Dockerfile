FROM node:18-alpine as development
WORKDIR /home/db
COPY package.json ./
RUN npm install
COPY . .

# Building app
RUN npm install -D nodemon
RUN npm install -D ts-node
RUN npm run build
EXPOSE 5000

# Running the app
CMD ["npm", "start"]