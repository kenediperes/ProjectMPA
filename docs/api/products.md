# Products API

## Base URL
`/api/products`

All endpoints require authentication. Include JWT token in `Authorization: Bearer <token>` header.

---

## Endpoints

### Get All Products
**GET** `/`

#### Query Parameters (optional)
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Filter by name or SKU |
| min_stock | integer | Filter products with stock below this value |
| category | string | Filter by category (if implemented) |

#### Response (200 OK)
```json
[
  {
    "id": 1,
    "name": "Laptop Pro 14",
    "description": "High performance laptop",
    "sku": "LP-001",
    "quantity": 50,
    "min_stock": 10,
    "price": 15000000,
    "unit": "pcs",
    "created_at": "2025-01-15T10:00:00Z"
  },
  ...
]