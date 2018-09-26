FROM phusion/baseimage:0.9.19

RUN apt-get update &&\
    apt-get install -y npm &&\
    npm install -g n

ARG NODE_ENV=production
ARG NODE_VERSION=latest
ARG project_path=$PROJECT_PATH
ARG yarn=false

# Add
RUN groupadd -r www-api &&\
    useradd -r -g www-api www-api

RUN mkdir -p /home/www-api &&\
    chmod 777 /home/www-api -R

# Install the specified NODE_VERSION
RUN n "$NODE_VERSION"

# Install yarn
RUN if [ ${YARN} = true ]; then \
        npm install -g yarn \
    ;fi

COPY run-node.sh /usr/bin/run-node
RUN chmod 700 /usr/bin/run-node

WORKDIR /opt/api
