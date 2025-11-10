# Stage 1: Build the Spring Boot app using JDK 21 (LTS)
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src src

# Copy Maven wrapper and set permissions
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x ./mvnw

# Build the app (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the Spring Boot JAR
FROM eclipse-temurin:21-jdk
WORKDIR /app
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 8080