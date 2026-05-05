# Database Schema

MongoDB database: `bookStore`

## users

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId/String | Primary key |
| `fullname` | String | Display name |
| `email` | String | Unique |
| `password` | String | BCrypt hash |
| `address` | String | Reader location |
| `number` | String | Unique phone number |
| `role` | String | `user`, `admin`, or `organization` |
| `orders` | Array | Legacy saved order structure |

## books

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId/String | Primary key |
| `name` | String | Book title |
| `author` | String | Author |
| `genre` | String | Genre/filter value |
| `category` | String | Backward-compatible category |
| `location` | String | Pickup/search location |
| `availabilityType` | String | `lend`, `swap`, or `donate` |
| `status` | String | `available`, `requested`, `lent`, `swapped`, `returned` |
| `condition` | String | `Like New`, `Good`, `Readable` |
| `description` | String | Owner notes |
| `image` | String | Cover URL |
| `user` | String | Owner user id |

## book_requests

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId/String | Primary key |
| `bookId` | String | Requested book |
| `requesterId` | String | Reader making request |
| `ownerId` | String | Book owner |
| `requestType` | String | `borrow` or `swap` |
| `offeredBookId` | String | Optional book offered for swap |
| `message` | String | Request note |
| `status` | String | `pending`, `approved`, `rejected`, `returned` |
| `dueDate` | Date | Default 14 days after request |
| `createdAt` | DateTime | Created timestamp |
| `updatedAt` | DateTime | Last update timestamp |

## notifications

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId/String | Primary key |
| `userId` | String | Recipient |
| `type` | String | `new_request`, `request_approved`, etc. |
| `message` | String | Notification text |
| `read` | Boolean | Read state |
| `createdAt` | DateTime | Created timestamp |
