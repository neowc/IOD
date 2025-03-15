# Todo Application API Documentation

This document provides detailed information about the API endpoints available in the Todo Application.

## Base URL

All API routes are relative to your application's base URL:

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most API endpoints require authentication. The application uses NextAuth.js for authentication handling.

When making requests to protected endpoints, ensure that the user is authenticated through a valid NextAuth.js session.

## Error Handling

All API endpoints follow a standard error response format:

```json
{
  "error": "Error message"
}
```

HTTP status codes are used to indicate the result of the request:

- `200` - Success
- `201` - Created
- `400` - Bad Request (client error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate entry)
- `500` - Server Error

## API Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourSecurePassword"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Todos

#### Get all todos for authenticated user

```
GET /todos
```

Response:
```json
[
  {
    "id": 1,
    "activity": "Complete project",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "completed": false,
    "priority": "HIGH",
    "createdAt": "2023-01-15T12:00:00.000Z",
    "updatedAt": "2023-01-15T12:00:00.000Z",
    "categoryId": 1,
    "userId": "user-id",
    "category": {
      "id": 1,
      "name": "Work",
      "color": "#FF0000"
    }
  },
  // More todos...
]
```

#### Create a new todo

```
POST /todos
```

Request body:
```json
{
  "activity": "Buy groceries",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "priority": "MEDIUM",
  "categoryId": 2
}
```

Response:
```json
{
  "id": 2,
  "activity": "Buy groceries",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "completed": false,
  "priority": "MEDIUM",
  "createdAt": "2023-01-15T12:00:00.000Z",
  "updatedAt": "2023-01-15T12:00:00.000Z",
  "categoryId": 2,
  "userId": "user-id",
  "category": {
    "id": 2,
    "name": "Personal",
    "color": "#00FF00"
  }
}
```

#### Get a specific todo

```
GET /todos/:id
```

Response:
```json
{
  "id": 1,
  "activity": "Complete project",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "completed": false,
  "priority": "HIGH",
  "createdAt": "2023-01-15T12:00:00.000Z",
  "updatedAt": "2023-01-15T12:00:00.000Z",
  "categoryId": 1,
  "userId": "user-id",
  "category": {
    "id": 1,
    "name": "Work",
    "color": "#FF0000"
  }
}
```

#### Update a todo

```
PUT /todos/:id
```

Request body (all fields optional):
```json
{
  "activity": "Complete project report",
  "dueDate": "2023-12-15T00:00:00.000Z",
  "completed": true,
  "priority": "MEDIUM",
  "categoryId": 1
}
```

Response:
```json
{
  "id": 1,
  "activity": "Complete project report",
  "dueDate": "2023-12-15T00:00:00.000Z",
  "completed": true,
  "priority": "MEDIUM",
  "createdAt": "2023-01-15T12:00:00.000Z",
  "updatedAt": "2023-01-16T10:00:00.000Z",
  "categoryId": 1,
  "userId": "user-id",
  "category": {
    "id": 1,
    "name": "Work",
    "color": "#FF0000"
  }
}
```

#### Delete a todo

```
DELETE /todos/:id
```

Response:
```json
{
  "message": "Todo deleted successfully"
}
```

#### Share a todo with another user

```
POST /todos/:id/share
```

Request body:
```json
{
  "email": "colleague@example.com",
  "permission": "EDIT"
}
```

Response:
```json
{
  "id": 1,
  "todoId": 1,
  "userId": "shared-user-id",
  "permission": "EDIT",
  "createdAt": "2023-01-16T10:00:00.000Z"
}
```

#### Get users with access to a todo

```
GET /todos/:id/share
```

Response:
```json
{
  "owner": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/avatar.jpg",
    "permission": "OWNER"
  },
  "sharedUsers": [
    {
      "id": "shared-user-id",
      "name": "Jane Smith",
      "email": "colleague@example.com",
      "image": null,
      "permission": "EDIT"
    }
  ]
}
```

#### Remove a user's access to a todo

```
DELETE /todos/:id/share
```

Request body:
```json
{
  "userId": "shared-user-id"
}
```

Response:
```json
{
  "message": "Access removed successfully"
}
```

### Categories

#### Get all categories for authenticated user

```
GET /categories
```

Response:
```json
[
  {
    "id": 1,
    "name": "Work",
    "color": "#FF0000",
    "userId": "user-id",
    "createdAt": "2023-01-15T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Personal",
    "color": "#00FF00",
    "userId": "user-id",
    "createdAt": "2023-01-15T12:00:00.000Z"
  },
  // More categories...
]
```

#### Create a new category

```
POST /categories
```

Request body:
```json
{
  "name": "Health",
  "color": "#0000FF"
}
```

Response:
```json
{
  "id": 3,
  "name": "Health",
  "color": "#0000FF",
  "userId": "user-id",
  "createdAt": "2023-01-16T10:00:00.000Z"
}
```

#### Get a specific category

```
GET /categories/:id
```

Response:
```json
{
  "id": 1,
  "name": "Work",
  "color": "#FF0000",
  "userId": "user-id",
  "createdAt": "2023-01-15T12:00:00.000Z",
  "todos": [
    {
      "id": 1,
      "activity": "Complete project",
      "dueDate": "2023-12-31T00:00:00.000Z",
      "completed": false,
      "priority": "HIGH",
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-15T12:00:00.000Z",
      "categoryId": 1,
      "userId": "user-id"
    },
    // More todos in this category...
  ]
}
```

#### Update a category

```
PUT /categories/:id
```

Request body (all fields optional):
```json
{
  "name": "Work & Projects",
  "color": "#FF5500"
}
```

Response:
```json
{
  "id": 1,
  "name": "Work & Projects",
  "color": "#FF5500",
  "userId": "user-id",
  "createdAt": "2023-01-15T12:00:00.000Z"
}
```

#### Delete a category

```
DELETE /categories/:id
```

Response:
```json
{
  "message": "Category deleted successfully"
}
```

### Notifications

#### Get all notifications for authenticated user

```
GET /notifications
```

Response:
```json
[
  {
    "id": 1,
    "message": "John Doe shared a task with you: Complete project",
    "read": false,
    "createdAt": "2023-01-16T10:00:00.000Z",
    "userId": "user-id",
    "todoId": 1
  },
  // More notifications...
]
```

#### Mark a notification as read

```
PUT /notifications/:id
```

Request body:
```json
{
  "read": true
}
```

Response:
```json
{
  "id": 1,
  "message": "John Doe shared a task with you: Complete project",
  "read": true,
  "createdAt": "2023-01-16T10:00:00.000Z",
  "userId": "user-id",
  "todoId": 1
}
```

#### Delete a notification

```
DELETE /notifications/:id
```

Response:
```json
{
  "message": "Notification deleted successfully"
}
```

## WebSocket Events (Future Implementation)

For real-time features like notifications and collaboration, the application may implement WebSocket events:

- `todo:created` - A new todo was created
- `todo:updated` - A todo was updated
- `todo:deleted` - A todo was deleted
- `todo:shared` - A todo was shared
- `notification:created` - A new notification was created

## API Rate Limiting

To protect the API from abuse, rate limiting is implemented:

- 100 requests per minute per IP address
- 1000 requests per hour per user

When a rate limit is exceeded, the API returns:

```
Status: 429 Too Many Requests
```

Response:
```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

## Pagination

For endpoints that may return large numbers of items, pagination is supported:

```
GET /todos?page=1&limit=10
```

Response:
```json
{
  "data": [
    // Array of items
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

## Future API Enhancements

The following enhancements are planned for future releases:

1. Bulk operations (create/update/delete multiple items)
2. Filter todos by date range
3. Advanced search functionality
4. Export todos to different formats (CSV, PDF)
5. Integration with calendar services (Google Calendar, Outlook)
