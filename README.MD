# PRESENTDAY config

Master config repository for presentday system. Currently, includes:
- docker-compose for LOCAL deployment:
  - postgresql db (port 5433)
  - mongo db (port 27017)
  - kafka (port 9092)
- docker-compose for PROD deployment:
  - postgresql db (port 5433)
  - mongo db (port 27017)
  - kafka (port 9092)
  - user-service (port 8081)
  - notification-service (no port)

## Prerequisites

- docker-compose

## Running system

### LOCAL env
- cd /local
- docker-compose up -d

please not: will launch spring boot apps in 'local' profile

### PROD env
- cd /prod
- docker-compose up -d

please note: will launch spring boot apps in 'prod' profile