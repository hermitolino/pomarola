FROM node:latest 

RUN apt-get update &&\
    apt-get install -y npm &&\
    npm install -g n

# Add
RUN groupadd -r www-api &&\
    useradd -r -g www-api www-api

RUN mkdir -p /home/www-api &&\
    chmod 777 /home/www-api -R
WORKDIR /opt/api

CMD ["npm", "install"]

EXPOSE 8080

CMD ["node", "server.js"]
