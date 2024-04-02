# Presentday System Configuration

Welcome to the master config repository for the Presentday system. This repository contains configuration files for two environments: Local and Prod.

## Local Environment

In the local environment, manual launching of specific microservices is required. These services include:

  - api-gateway (8080)
  - user-service (8081)
  - notification-service (not exposed)

Additionally, the Docker Compose setup includes the following services:

  - postgresql db (port 5433)
  - mongo db (port 27017)
  - kafka (port 9092)

## Prod Environment

In the production environment, the Docker Compose setup includes the following services:

- API Gateway (Port 8080)
- User Service (Not exposed)
- Notification Service (Not exposed)
- PostgreSQL DB (Port 5433)
- MongoDB (Port 27017)
- Kafka (Port 9092)

Furthermore, a Maven project named "property-library" has been introduced. This project includes configurations for Kafka topics, mail credentials, and JWT secrets. The library is embedded within the respective microservices in the JAR files.

## Prerequisites

Before running the system, ensure you have Docker Compose installed.

## Running system

### Local Environment
To run the system in the local environment, follow these steps:
1. Navigate to the `/local` directory.
2. Run the command `docker-compose up -d`

Please note that this will launch the Spring Boot applications in the 'local' profile. However, manual launching of microservices is still required.

### Prod Environment
To run the system in the production environment, follow these steps:

1. Navigate to the `/prod` directory.
2. Run the command `docker-compose up -d`

Please note that this will launch the entire system in the 'prod' profile.