FROM nginx:1.11

# Add
RUN groupadd -r www-api &&\
    useradd -r -g www-api www-api

RUN mkdir -p /home/www-api &&\
    chmod 777 /home/www-api -R

RUN mkdir /etc/nginx/sites-available && rm /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx

COPY sites /etc/nginx/sites-available

CMD nginx
