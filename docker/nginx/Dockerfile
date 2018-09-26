FROM nginx:1.11

# Add
RUN groupadd -r www-api &&\
    useradd -r -g www-api www-api

RUN mkdir -p /home/www-api &&\
    chmod 777 /home/www-api -R

RUN mkdir /etc/nginx/sites-available && rm /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx
ADD build-nginx.sh /root/scripts/build-nginx.sh
COPY sites /etc/nginx/sites

ARG WEB_REVERSE_PROXY_PORT=8000
ARG WEB_SSL=false
ARG SELF_SIGNED=false
ARG NO_DEFAULT=false

ENV WEB_REVERSE_PROXY_PORT=$WEB_REVERSE_PROXY_PORT
ENV WEB_SSL=$WEB_SSL
ENV SELF_SIGNED=$SELF_SIGNED
ENV NO_DEFAULT=$NO_DEFAULT

RUN /bin/bash /root/scripts/build-nginx.sh

CMD nginx
