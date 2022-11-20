FROM openjdk:15.0
COPY ./auth-service/target/auth-service.jar /app/
ENTRYPOINT ["java","-jar","/app/auth-service.jar"]
EXPOSE 5000