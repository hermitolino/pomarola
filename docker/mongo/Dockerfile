FROM mongo:3.3

# Add mongo user

RUN groupadd -r mongo &&\
    useradd -r -g mongo mongo
RUN mkdir -p data/mongo/

USER mongo

CMD mongod --dbpath=/var/lib/mongodb
