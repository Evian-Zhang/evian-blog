FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --production
RUN chmod +x ./start.sh

CMD ["./start.sh"]