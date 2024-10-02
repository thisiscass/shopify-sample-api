# Mini-Rutter API

This API fetches data from Shopify and transforms the data into a simpler format.

## Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Stopping the Project](#stopping-the-project)

## Project Overview

This is a simple Node.js and Express application using TypeScript, Axios, Sequelize ORM, and PostgreSQL as the database. The project runs inside Docker using `docker-compose` for ease of setup and deployment.

## Technologies Used
- Node.js
- Express
- TypeScript
- Sequelize ORM
- PostgreSQL
- Docker
- Axios

## Prerequisites
Before you can run the project, ensure that you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the repository
```bash
git clone https://github.com/thisiscass/mini-rutter-api.git
cd mini-rutter-api
npm install (if you are outside docker)
```

### Running the Project
```bash
docker-compose up
```

### Stopping the Project
```bash
docker-compose down
```
