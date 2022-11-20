FROM openjdk:15.0
COPY ./notification-service/target/notification-service.jar /app/
ENTRYPOINT ["java","-jar","/app/notification-service.jar"]
EXPOSE 8300