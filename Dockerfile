FROM node:16.15

WORKDIR /app

COPY package*.json ./
COPY . ./
# ADD . /app


RUN npm install

EXPOSE 3000

CMD npm start