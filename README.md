# Book Swap & Lending Platform

Book Swap is a full-stack community platform where readers can list books they own, discover books available nearby, request to borrow or swap books, and track the full lending lifecycle from request to approval, due date, and return.

The project is designed around the hackathon problem statement: make reading more accessible, encourage sustainable reuse of books, and give book owners and borrowers a clear workflow with request tracking and notifications.

## Problem Statement

Many readers have books they no longer actively use, while other readers want access to those books without buying new copies. This platform connects those two groups through a local catalog, personal libraries, borrow/swap requests, owner approvals, and status notifications.

## Core User Roles

### Reader

- Registers and logs in.
- Browses the community book catalog.
- Searches by title, author, genre, availability type, or location.
- Sends borrow or swap requests.
- Tracks outgoing requests and request statuses.
- Receives notifications when request statuses change.

### Book Owner

- Adds books to a personal library.
- Marks books as available for lending, swapping, or donation.
- Reviews incoming borrow/swap requests.
- Approves, rejects, or marks books as returned.
- Tracks the status of listed books.

## Features

### Book Catalog & Search

- Add books with title, author, genre, condition, location, cover image, notes, and availability type.
- Browse all community listings.
- Search by query, location, and listing type.
- View detailed book information.
- Track book status: `available`, `requested`, `lent`, `swapped`, or `returned`.

### Borrow & Swap Requests

- Readers can request a book for borrowing.
- Readers can propose a swap.
- Owners can approve or reject incoming requests.
- Owners can mark an approved request as returned.
- Requests include type, status, due date, timestamps, requester, owner, and book reference.

### Notifications

- Notification records are created for important request events.
- Owners receive notifications for new requests.
- Requesters receive notifications when a request is approved, rejected, or returned.
- The account dashboard shows recent notifications.

### User Dashboard

- Profile summary.
- Personal library.
- Incoming owner requests.
- Outgoing reader requests.
- Recent notifications.
- Quick action to list another book.

### Documentation Deliverables

- Architecture diagram: `docs/ARCHITECTURE.md`
- API documentation: `docs/API.md`
- Database schema: `docs/DATABASE_SCHEMA.md`

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- React Hot Toast
- React Icons
- Framer Motion

### Backend

- Java 17
- Spring Boot 3.2
- Spring Web
- Spring Security
- Spring Data MongoDB
- Lombok
- Maven

### Database

- MongoDB

The brief recommends PostgreSQL/MySQL plus Redis for production-scale systems. This implementation uses MongoDB because the existing project was already structured around Mongo-style documents and repositories. Redis or WebSocket/SSE can be added later for stronger real-time notification delivery.

## Folder Structure

```text
book-swap-updated/
├── Backend/
│   ├── pom.xml
│   ├── README.md
│   └── src/main/
│       ├── java/com/bookswap/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── model/
│       │   └── repository/
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── home/
│       ├── account/
│       ├── add_book/
│       ├── bookdetail/
│       └── search/
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DATABASE_SCHEMA.md
└── README.md
```

## Environment Variables

### Backend

Create environment variables or copy `Backend/.env.example`.

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/bookStore
FRONTEND_URL=http://localhost:5173
```

Spring Boot also has defaults in `Backend/src/main/resources/application.properties`.

### Frontend

Create `frontend/.env` or copy `frontend/.env.example`.

```env
VITE_BACKEND_URL=http://localhost:4000
```

If this variable is missing, the frontend defaults to `http://localhost:4000`.

## Prerequisites

- Node.js 18 or newer
- npm
- Java 17 or newer
- Maven 3.6 or newer
- MongoDB running locally, or a MongoDB Atlas URI

## Local Setup

### 1. Start MongoDB

Use local MongoDB:

```bash
mongod
```

Or set `MONGODB_URI` to a MongoDB Atlas connection string.

### 2. Run Backend

```bash
cd Backend
mvn spring-boot:run
```

Backend default URL:

```text
http://localhost:4000
```

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

## Build & Test

### Frontend Production Build

```bash
cd frontend
npm run build
```

### Backend Compile/Test

```bash
cd Backend
mvn test
```

### Backend Package

```bash
cd Backend
mvn clean package
java -jar target/book-swap-1.0.0.jar
```

## Main Application Flow

1. A reader signs up and logs in.
2. The reader lists books in their personal library.
3. Other readers browse or search the catalog.
4. A reader opens a book and sends a borrow or swap request.
5. The book owner sees the request in the dashboard.
6. The owner approves or rejects the request.
7. The requester receives a notification.
8. If approved, the owner can later mark the book as returned.
9. The book status updates back to available after return.

## API Overview

Base URL:

```text
http://localhost:4000
```

### User APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/user/signup` | Register a reader |
| POST | `/user/signup/organization` | Register an organization account |
| POST | `/user/login` | Login |
| GET | `/user/{id}` | Get profile |
| PUT | `/user/{id}` | Update profile |
| GET | `/user/{id}/orders` | Legacy order history |
| PUT | `/user/{id}/orders` | Legacy add order |

### Book APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/book` | List all books |
| GET | `/book/search?query=&location=&type=` | Search catalog |
| GET | `/book/{id}` | Get book details |
| GET | `/book/book/{userId}` | Get books by owner |
| POST | `/book` | Add a book |
| PUT | `/book/{id}` | Update a book |
| DELETE | `/book/{id}` | Delete a book |

### Request APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/requests` | Create borrow/swap request |
| GET | `/requests/user/{userId}` | List requests sent by reader |
| GET | `/requests/owner/{ownerId}` | List requests received by owner |
| PUT | `/requests/{id}/status` | Approve, reject, or mark returned |

### Notification APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/notifications/{userId}` | List user notifications |
| PUT | `/notifications/{id}/read` | Mark notification as read |

For detailed request/response examples, see `docs/API.md`.

## Database Collections

### `users`

Stores registered readers and owners.

Important fields:

- `fullname`
- `email`
- `password`
- `address`
- `number`
- `role`

### `books`

Stores listed books.

Important fields:

- `name`
- `author`
- `genre`
- `location`
- `availabilityType`
- `status`
- `condition`
- `description`
- `image`
- `user`

### `book_requests`

Stores borrow and swap requests.

Important fields:

- `bookId`
- `requesterId`
- `ownerId`
- `requestType`
- `status`
- `dueDate`
- `createdAt`
- `updatedAt`

### `notifications`

Stores notification records.

Important fields:

- `userId`
- `type`
- `message`
- `read`
- `createdAt`

For the complete schema, see `docs/DATABASE_SCHEMA.md`.

## Current Real-Time Behavior

The current implementation creates notification records immediately when request events happen. The frontend loads those notifications in the dashboard.

For production-grade real-time behavior, the next upgrade would be:

- Spring WebSocket or Server-Sent Events for instant browser updates.
- Redis Pub/Sub for notification fanout.
- Email alerts with Spring Mail for due dates and request changes.
- A scheduled job for due-date reminders.

## Known Notes

- The cart/order/payment code still exists from the previous project version for compatibility, but the main updated flow is borrow/swap/lending.
- Authentication currently stores the logged-in user in the frontend context/local storage style used by the existing app. A production version should use JWT or secure session cookies.
- Ratings are part of the challenge requirements and are prepared conceptually in the workflow, but a dedicated ratings model/API is a recommended next enhancement.

## Troubleshooting

### Frontend cannot reach backend

Check that the backend is running on port `4000` and that `frontend/.env` contains:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Restart the Vite dev server after changing `.env`.

### Backend cannot connect to MongoDB

Check `MONGODB_URI`. For local MongoDB, make sure MongoDB is running:

```bash
mongod
```

### Maven command not found

Install Maven and add it to PATH, or run the project from IntelliJ IDEA using its bundled Maven.

### Port already in use

Change the backend port:

```env
PORT=4001
```

Then update frontend:

```env
VITE_BACKEND_URL=http://localhost:4001
```

## Judging Criteria Coverage

| Category | Implementation |
|---|---|
| User Experience & Interface | Browse, search, list, request, dashboard, notifications |
| Real-Time Performance | Notification records on request events, ready for WebSocket/SSE upgrade |
| Scalability & Architecture | Spring Boot layered backend, MongoDB repositories, extensible notification design |
| Completeness | Catalog, personal library, borrow/swap requests, approval workflow, return tracking |
| Innovation | Community sharing, sustainability focus, local discovery, dashboard-based lending workflow |

## Future Enhancements

- JWT authentication and role-based authorization.
- User-to-user ratings after completed returns.
- Email alerts with Spring Mail.
- Real-time notification stream with Spring WebSocket or SSE.
- Redis caching for popular searches.
- Due-date reminder scheduler.
- Swap offer selection from the requester’s own library.
- Admin moderation for unsafe listings or poor lending behavior.
