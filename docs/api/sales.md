
---

### 2. `erp-system/docs/api/sales.md`

```markdown
# Sales API (Sales Orders & Quotations)

## Base URL
- Sales Quotations: `/api/sales-quotations`
- Sales Orders: `/api/sales-orders`
- Work Orders: `/api/work-orders`
- Quality Control: `/api/quality-controls`

All endpoints require authentication.

---

## Sales Quotations

### Create Quotation
**POST** `/api/sales-quotations`

#### Request Body
```json
{
  "customer_id": 1,
  "items": [
    { "product_id": 1, "quantity": 2, "price": 15000000 }
  ],
  "total_amount": 30000000
}