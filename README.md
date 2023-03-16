# Rentler

Rentler is the real estate platform that offers a digital rental journey. It automates the standard rental tasks making the whole experience contact-free. All can be done in one place, hassle-free, and with no face-to-face contact.

## Team & Responsibilities 
### Project Manager### (Marta Kostetska): will oversee the entire project and ensure that it is completed on time and within budget. They will manage the project schedule, assign tasks to team members, and monitor progress. 
### Software Developers### (Kyryl Halmiz, Andriy Pyzh): will be responsible for developing the application using the required technologies such as React, PostgreSQL, Docker, Spring Cloud, Spring framework, and Spring Boot. They will create the application's front-end and back-end, and integrate the various components using microservice architecture. 
### UX Designer (Kyryl Halmiz):###  will be responsible for creating a user-friendly and intuitive interface that is easy to navigate, visually appealing, and meets the needs of the target audience. 
### Quality Assurance Tester### (Serhii Pylypchuk): will be responsible for testing the application to ensure that it is functioning properly, free of bugs, and meets the necessary requirements. 
### DevOps Engineer### (Volodymyr Shabat, Andriy Pyzh): will be responsible for deploying and managing the application on a cloud infrastructure such as Google Cloud using Docker containers. They will also be responsible for ensuring that the application is scalable, secure, and highly available. 
### Business Analyst### (Marta Kostetska): will be responsible for gathering requirements, conducting market research, and analyzing user feedback to ensure that the application meets the needs of the target audience and aligns with the business goals.

## How to run all the things?

Keep in mind, that you are going to start 8 Spring Boot applications, Postgres instance, RabbitMq and React App. 
Make sure you have `4 Gb` RAM available on your machine.

#### Before you start
- Install Docker and Docker Compose.
- Change environment variable values in `.env` file for more security or leave it as it is.
- Make sure to build the project: `mvn install -DskipTests`

#### To Launch
Run `docker-compose up ` to start all things.





## URLs

### Web Client

http://localhost:3000

### Config server

http://localhost:8888

### Registry server

http://localhost:8761

### API Gateway

http://localhost:8765

### Zipkin server

http://localhost:9411

### Postgres

http://localhost:5432

### Auth service

http://localhost:5000

### Account service

http://localhost:8100

### Apartment service

http://localhost:8200

### RabbitMQ

http://localhost:15672 (guest/guest)
