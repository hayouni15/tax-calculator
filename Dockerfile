FROM node:16.15

COPY ./package*.json ./app/
ADD ./ /app

WORKDIR /app
RUN npm install

EXPOSE 3000

CMD npm start