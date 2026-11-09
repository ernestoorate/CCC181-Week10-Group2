
# CampusConnect API Specification

## 1. API Overview

The CampusConnect API is a REST API developed using Node.js and Express. It handles user authentication and provides access to authenticated user information.

**Base URL:** `http://localhost:3000/api/v1`

**Data Format:** JSON

## 2. API Endpoints

| Method | Endpoint | Purpose | Success | Error |
|---|---|---|---|---|
| GET | /health | Check if the API is running | 200 OK | None |
| POST | /sessions | Authenticate a user and create a login session | 200 OK | 400, 401 |
| GET | /users/me | Retrieve the currently authenticated user | 200 OK | 401 |

## 3. Endpoint Details

### 3.1 Health Check

**Method:** GET

**Endpoint:** `/api/v1/health`

**Description:** Checks whether the CampusConnect backend API is running.

**Successful Response: 200 OK**

```json
{
  "status": "ok"
}
```

### 3.2 User Login

**Method:** POST

**Endpoint:** `/api/v1/sessions`

**Description:** Authenticates a user using their email and password. If the credentials are correct, the API generates a JWT token.

**Request Body:**

```json
{
  "email": "student@campusconnect.test",
  "password": "Campus26"
}
```

**Successful Response: 200 OK**

```json
{
  "token": "<a long token text>",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "student@campusconnect.test"
  }
}
```

**Error Response: 400 Bad Request**

```json
{
  "error": "Email and password are required."
}
```

**Error Response: 401 Unauthorized**

```json
{
  "error": "Invalid email or password."
}
```

### 3.3 Get Current User

**Method:** GET

**Endpoint:** `/api/v1/users/me`

**Description:** Retrieves the information of the currently authenticated user. Requires a valid JWT token.

**Request Header:**

```http
Authorization: Bearer <token>
```

**Successful Response: 200 OK**

```json
{
  "id": 1,
  "name": "Demo Student",
  "email": "student@campusconnect.test"
}
```

**Error Response: 401 Unauthorized**

```json
{
  "error": "Not logged in."
}
```

## 4. Required Demo Account

| Field | Value |
|---|---|
| Email | student@campusconnect.test |
| Password | Campus26 |
| Name | Demo Student |

Passwords must be stored as hashed values using bcryptjs. Plain-text passwords must not be stored.

## 5. Events API (Design Only)

The Events API is designed to manage and retrieve campus events in the CampusConnect application. The following endpoints describe the planned operations. These endpoints are for API design and documentation only and are not required to be implemented in this activity.

### 5.1 Retrieve All Events

**Method:** GET

**Endpoint:** `/api/v1/events`

**Description:** Retrieves the list of available campus events.

**Successful Response: 200 OK**

```json
{
  "events": [
    {
      "id": 1,
      "title": "Campus Orientation",
      "description": "Orientation for new students",
      "date": "2026-11-15",
      "location": "University Campus"
    }
  ]
}
```

**Possible Status Codes:**
- `200 OK` – Events successfully retrieved.
- `500 Internal Server Error` – Unexpected server error.

### 5.2 Retrieve a Specific Event

**Method:** GET

**Endpoint:** `/api/v1/events/:id`

**Description:** Retrieves the details of a specific event using its ID.

**Example Request:**

`GET /api/v1/events/1`

**Successful Response: 200 OK**

```json
{
  "id": 1,
  "title": "Campus Orientation",
  "description": "Orientation for new students",
  "date": "2026-11-15",
  "location": "University Campus"
}
```

**Possible Status Codes:**
- `200 OK` – Event successfully retrieved.
- `404 Not Found` – Event does not exist.
- `500 Internal Server Error` – Unexpected server error.

### 5.3 Create an Event

**Method:** POST

**Endpoint:** `/api/v1/events`

**Description:** Creates a new campus event.

**Request Body:**

```json
{
  "title": "Campus Orientation",
  "description": "Orientation for new students",
  "date": "2026-11-15",
  "location": "University Campus"
}
```

**Successful Response: 201 Created**

```json
{
  "message": "Event created successfully.",
  "event": {
    "id": 1,
    "title": "Campus Orientation",
    "description": "Orientation for new students",
    "date": "2026-11-15",
    "location": "University Campus"
  }
}
```

**Possible Status Codes:**
- `201 Created` – Event successfully created.
- `400 Bad Request` – Required event information is missing or invalid.
- `500 Internal Server Error` – Unexpected server error.

### 5.4 Update an Event

**Method:** PATCH

**Endpoint:** `/api/v1/events/:id`

**Description:** Updates selected information of an existing event.

**Example Request:**

`PATCH /api/v1/events/1`

**Request Body:**

```json
{
  "title": "Updated Campus Orientation",
  "location": "University Gymnasium"
}
```

**Successful Response: 200 OK**

```json
{
  "message": "Event updated successfully."
}
```

**Possible Status Codes:**
- `200 OK` – Event successfully updated.
- `400 Bad Request` – Invalid update information.
- `404 Not Found` – Event does not exist.
- `500 Internal Server Error` – Unexpected server error.

### 5.5 Delete an Event

**Method:** DELETE

**Endpoint:** `/api/v1/events/:id`

**Description:** Deletes an existing event using its ID.

**Example Request:**

`DELETE /api/v1/events/1`

**Successful Response: 200 OK**

```json
{
  "message": "Event deleted successfully."
}
```

**Possible Status Codes:**
- `200 OK` – Event successfully deleted.
- `404 Not Found` – Event does not exist.
- `500 Internal Server Error` – Unexpected server error.

### 5.6 Filter Events by Month

**Method:** GET

**Endpoint:** `/api/v1/events?month=11`

**Description:** Retrieves events scheduled within the specified month.

**Example Request:**

`GET /api/v1/events?month=11`

**Successful Response: 200 OK**

```json
{
  "events": [
    {
      "id": 1,
      "title": "Campus Orientation",
      "description": "Orientation for new students",
      "date": "2026-11-15",
      "location": "University Campus"
    }
  ]
