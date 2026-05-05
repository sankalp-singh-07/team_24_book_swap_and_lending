# Book Swap & Lending Platform

A full-stack community platform for readers to list books, discover nearby titles, request borrow/swap exchanges, and track approvals, due dates, returns, and notifications.

## Features

- User signup/login and personal library management.
- Add, edit, search, and remove books with title, author, genre, location, availability, condition, and status.
- Borrow/swap request workflow with owner approval, rejection, and return tracking.
- Notification records for new requests and request status changes.
- Reader dashboard with listed books, incoming owner requests, outgoing requests, and recent notifications.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, DaisyUI, Axios, React Router.
- Backend: Java 17, Spring Boot, Spring Web, Spring Security, Spring Data MongoDB.
- Database: MongoDB for users, books, requests, notifications, and saved items.

## Run Locally

Backend:

```bash
cd Backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Deliverables

- UI: browse/search books, list books, request borrow/swap, owner dashboard, request tracking, notifications.
- Architecture: see `docs/ARCHITECTURE.md`.
- API documentation: see `docs/API.md`.
- Database schema: see `docs/DATABASE_SCHEMA.md`.
