
---

### 4. `erp-system/docs/api/reports.md`

```markdown
# Reports API

## Base URL
`/api/reports`

All endpoints require authentication.

---

## Sales Report
**GET** `/sales`

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| start_date | string | Yes | YYYY-MM-DD |
| end_date | string | Yes | YYYY-MM-DD |
| group_by | string | No | day, month, year (default: day) |

#### Response (200 OK)
```json
[
  {
    "date": "2025-01-20",
    "order_count": 5,
    "total_amount": 45000000
  },
  {
    "date": "2025-01-21",
    "order_count": 3,
    "total_amount": 27000000
  }
]