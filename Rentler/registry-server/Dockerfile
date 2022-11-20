FROM openjdk:15.0
COPY ./registry-server/target/registry-server.jar /app/
ENTRYPOINT ["java","-jar","/app/registry-server.jar"]
EXPOSE 8761