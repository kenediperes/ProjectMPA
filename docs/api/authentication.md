# Authentication API

## Base URL
`/api/auth`

## Endpoints

### Login
**POST** `/login`

Authenticate user and retrieve JWT token.

#### Request Body
```json
{
  "username": "admin",
  "password": "admin123"
}