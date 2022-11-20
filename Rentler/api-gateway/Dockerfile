FROM openjdk:15.0
COPY ./api-gateway/target/api-gateway.jar /app/
ENTRYPOINT ["java","-jar","/app/api-gateway.jar"]
EXPOSE 8765