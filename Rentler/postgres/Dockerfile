FROM postgres:alpine
COPY ./postgres/db-per-service.sql /docker-entrypoint-initdb.d/
EXPOSE 5432