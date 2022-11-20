# LNU CS masters project. OOA subject
# Rentler

Rentler is the real estate platform that offers a digital rental journey. It automates the standard rental tasks making the whole experience contact-free. All can be done in one place, hassle-free, and with no face-to-face contact.

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
