FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install
RUN chmod +x ./start.sh

CMD ["./start.sh"]