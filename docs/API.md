# API Documentation

Base URL: `http://localhost:4000`

## Users

| Method | Path | Description |
|---|---|---|
| POST | `/user/signup` | Register a reader |
| POST | `/user/login` | Login |
| GET | `/user/{id}` | Fetch profile |
| PUT | `/user/{id}` | Update profile |

## Books

| Method | Path | Description |
|---|---|---|
| GET | `/book` | List all books |
| GET | `/book/search?query=&location=&type=` | Search by title, author, genre/category, location, and availability type |
| GET | `/book/{id}` | Fetch book details |
| GET | `/book/book/{userId}` | Fetch books listed by a user |
| POST | `/book` | Add a book |
| PUT | `/book/{id}` | Edit book metadata |
| DELETE | `/book/{id}` | Remove book |

Example add book body:

```json
{
  "name": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self Help",
  "location": "Indore",
  "availabilityType": "lend",
  "condition": "Good",
  "description": "Available for a 14 day lending window.",
  "image": "https://example.com/cover.jpg",
  "userId": "owner-user-id"
}
```

## Borrow / Swap Requests

| Method | Path | Description |
|---|---|---|
| POST | `/requests` | Create a borrow/swap request |
| GET | `/requests/user/{userId}` | Requests sent by a reader |
| GET | `/requests/owner/{ownerId}` | Requests received by a book owner |
| PUT | `/requests/{id}/status` | Update request status |

Create request body:

```json
{
  "bookId": "book-id",
  "requesterId": "reader-user-id",
  "requestType": "borrow",
  "message": "Can I borrow this for two weeks?"
}
```

Update status body:

```json
{
  "status": "approved"
}
```

Allowed statuses: `pending`, `approved`, `rejected`, `returned`.

## Notifications

| Method | Path | Description |
|---|---|---|
| GET | `/notifications/{userId}` | List notifications for a user |
| PUT | `/notifications/{id}/read` | Mark notification as read |
