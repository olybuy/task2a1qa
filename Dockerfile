FROM node:16

RUN mkdir -p home/app

COPY . /home/app

RUN npm install

CMD ["node"]