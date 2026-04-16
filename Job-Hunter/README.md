# Job Hunter Project

## Overview

The Job Hunter project is a full-stack application that helps job seekers find opportunities and employers manage job postings. It consists of a backend RESTful API built with Java Spring Boot and a frontend web application built with React and Vite.

## Documentation

- **[Backend Documentation (Java Spring Boot)](https://github.com/TranDatk/Job-Hunter/blob/main/01-java-spring-jobhunter-final/README.md)**
- **[Frontend Documentation (React Vite)](https://github.com/TranDatk/Job-Hunter/blob/main/03-react-vite-jobhunter-final/README.md)**

## Docker Compose Setup

This project includes a `docker-compose.yml` file to set up and run the entire application stack, which includes:

- **Nginx**: Serves the frontend React application.
- **MySQL Database**: Stores all job listings, applications, and user data.
- **Spring Boot Backend**: Handles business logic, API requests, and interactions with the MySQL database.

## Running the Application

1. To start the entire application stack, use the following command:
   ```bash
      cd build-docker/
      docker compose -p datk-spring-rest up -d

This command will:
1. Build and run the backend Spring Boot application.
2. Set up the MySQL database.
3. Serve the frontend React application using Nginx.

## Accessing the Application
`Frontend`: The frontend will be accessible at http://localhost after the Nginx service starts.

`Backend`: The backend API will be accessible at http://localhost:8080.

`Database`: MySQL will be available on port 3307 for external access and 3306 for internal service communication.
