FROM node:latest

RUN mkdir -p /opt/api

WORKDIR /opt/api

ADD . /opt/api

RUN chmod -R 0777 /opt/api/data

EXPOSE 8080

CMD ["node", "server.js"]
