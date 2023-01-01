FROM node:14-alpine

WORKDIR /src

COPY package*json ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD ["node", "src/index.js"]