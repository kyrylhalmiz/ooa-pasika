FROM openjdk:15.0
COPY ./apartment-service/target/apartment-service.jar /app/
ENTRYPOINT ["java","-jar","/app/apartment-service.jar"]
EXPOSE 8200