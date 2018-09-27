FROM nginx:1.11

# Add
RUN groupadd -r pomarola &&\
    useradd -r -g pomarola pomarola

RUN mkdir -p /home/pomarola &&\
    chmod 777 /home/pomarola -R

RUN mkdir /etc/nginx/sites-available && rm /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx

COPY sites /etc/nginx/sites-available

CMD nginx
