FROM node:latest 

RUN apt-get update &&\
    apt-get install -y npm &&\
    npm install -g n

# Add
RUN groupadd -r pomarola &&\
    useradd -r -g pomarola pomarola

RUN mkdir -p /home/pomarola &&\
    chmod 777 /home/pomarola -R
WORKDIR /opt/api

CMD ["npm", "install"]

EXPOSE 8080

CMD ["node", "server.js"]
