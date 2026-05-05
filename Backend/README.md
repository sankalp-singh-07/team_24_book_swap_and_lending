# Book Swap Spring Boot Backend

Spring Boot backend for the Book Swap & Lending Platform. It supports reader profiles, book catalog/search, borrow/swap requests, owner approvals, return status updates, and notification records.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.2 |
| Database | MongoDB with Spring Data MongoDB |
| Auth/Hashing | Spring Security + BCryptPasswordEncoder |
| Language | Java 17 |

## Setup

Create environment variables or copy `.env.example`:

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/bookStore
FRONTEND_URL=http://localhost:5173
```

Run:

```bash
mvn spring-boot:run
```

Build:

```bash
mvn clean package
java -jar target/book-swap-1.0.0.jar
```

## Main Endpoints

- `POST /user/signup`, `POST /user/login`, `GET /user/{id}`, `PUT /user/{id}`
- `GET /book`, `GET /book/search?query=&location=&type=`, `POST /book`, `PUT /book/{id}`, `DELETE /book/{id}`
- `POST /requests`, `GET /requests/user/{userId}`, `GET /requests/owner/{ownerId}`, `PUT /requests/{id}/status`
- `GET /notifications/{userId}`, `PUT /notifications/{id}/read`

See `../docs/API.md` for full API documentation.
