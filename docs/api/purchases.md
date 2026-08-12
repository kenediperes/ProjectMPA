
---

### 3. `erp-system/docs/api/purchases.md`

```markdown
# Purchases API

## Base URL
- Suppliers: `/api/suppliers`
- Purchase Orders: `/api/purchase-orders`

All endpoints require authentication.

---

## Suppliers

### Get All Suppliers
**GET** `/api/suppliers`

#### Response (200 OK)
```json
[
  {
    "id": 1,
    "name": "PT Supplier Utama",
    "email": "supplier1@utama.com",
    "phone": "081111111111",
    "address": "Jl. Industri No. 10, Tangerang",
    "is_approved": true,
    "created_at": "2025-01-10T08:00:00Z"
  }
]