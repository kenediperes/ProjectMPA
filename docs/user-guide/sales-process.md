# Sales Process Guide

## Overview

The sales process in ERP follows a structured flow from quotation to delivery and payment.

**Flow:**  
Quotation → Sales Order → Work Order (if manufacturing) → Quality Control → Warehouse → Delivery → Invoice → Payment.

---

## 1. Creating a Sales Quotation

1. Go to **Sales Orders** → **Quotations**.
2. Click **New Quotation**.
3. Select a **Customer**.
4. Add products, quantities, and prices.
5. Review total amount.
6. Save as **Draft** or **Send to Customer**.

> Quotations can be converted to orders later.

---

## 2. Converting Quotation to Sales Order

1. Open an existing quotation.
2. Click **Convert to Order**.
3. The system creates a sales order with the same items.
4. The quotation status changes to "converted".

---

## 3. Creating a Sales Order Directly

1. From **Sales Orders**, click **New Sales Order**.
2. Select customer, add items, and set totals.
3. Submit.

The order will have status `pending`.

---

## 4. Order Fulfillment

### If product is in stock:
- The system reserves inventory.
- Proceed to **Warehouse** for packing and shipping.

### If product needs manufacturing:
- A **Work Order** is automatically created (or manually).
- Production team processes the work order.
- After production, **Quality Control** inspects the goods.

---

## 5. Quality Control (QC)

- QC is performed on work orders.
- Result: **Passed** or **Failed**.
- If failed, items may go to **Rework** (new work order) or be scrapped.
- Only passed items are sent to warehouse.

---

## 6. Warehouse & Delivery

1. After QC, goods are moved to **Warehouse** (stock-in).
2. Prepare shipment.
3. Update delivery status:
   - `pending` → `shipped` → `delivered`

---

## 7. Invoicing

- An invoice is generated from the sales order (automatically or manually).
- Invoice number and amount are set.
- Payment status: `unpaid` by default.

---

## 8. Payment Confirmation

- Customer pays.
- User marks invoice as **Paid**.
- Payment confirmation updates:
  - Invoice status → `paid`
  - Sales order payment_status → `paid`

---

## 9. Automatic Reminders

The system sends reminders (via notification) for:

- Unpaid invoices (daily until paid).
- Overdue invoices (after due date).
- Delivery delays.

---

## 10. Reporting

Sales data is aggregated in:

- **Sales Report** – Daily/monthly sales trends.
- **Financial Report** – Revenue, profit, loss.
- **Invoice Report** – Paid vs unpaid.

---

## Status Reference

| Entity        | Possible Statuses |
|---------------|-------------------|
| Sales Order   | pending, processing, completed, cancelled |
| Payment       | unpaid, paid, overdue |
| Delivery      | pending, shipped, delivered |
| Work Order    | pending, in_progress, completed, qc_passed, qc_failed |
| Invoice       | unpaid, paid, overdue |

---

## Tips for Efficient Sales

- Keep customer and product data updated.
- Regularly check low-stock items to avoid order delays.
- Use quotations to confirm orders before finalizing.
- Monitor unpaid invoices and send reminders promptly.
- Review sales reports to identify best-selling products.

---

## Troubleshooting

**Q: Why can't I create a sales order?**  
A: Check if customer is active and products have sufficient stock.

**Q: How do I handle a partial delivery?**  
A: Split the sales order into multiple deliveries (manual process for now).

**Q: What if QC fails?**  
A: Create a rework work order or cancel the production. Update sales order status accordingly.