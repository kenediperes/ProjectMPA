# Inventory Management Guide

## Overview

The Inventory module allows you to track stock levels, manage product information, and record stock movements.

---

## Accessing Inventory

1. From the sidebar, click **Products**.
2. You will see a list of all products.

---

## Product List View

The product table shows:

- **SKU** – Unique product code.
- **Name** – Product name.
- **Quantity** – Current stock.
- **Min Stock** – Threshold for low-stock alerts.
- **Price** – Selling price.
- **Unit** – Unit of measurement (pcs, kg, etc.).
- **Status** – Low stock or out-of-stock indicators.

---

## Adding a New Product

1. Click the **Add Product** button.
2. Fill in the form:
   - SKU (must be unique)
   - Name
   - Description (optional)
   - Quantity (initial stock)
   - Min Stock (alert level)
   - Price
   - Unit
3. Click **Create**.

> **Tip:** Use a consistent SKU naming convention for easy searching.

---

## Editing a Product

1. Click the **Edit** icon (pencil) next to a product.
2. Update the fields.
3. Click **Update**.

---

## Adjusting Stock

### Quick Adjust (Manual)

- Click the **+** button to add stock (e.g., +10).
- Click the **-** button to deduct stock (e.g., -5).

### Bulk Adjust

- Use the **Stock Adjustment** form (available from product detail page).

---

## Stock Check

Before creating a sales order, the system automatically checks availability. You can also manually check:

1. Go to the product detail page.
2. Enter the requested quantity.
3. The system will tell you if stock is sufficient.

---

## Low Stock Alerts

- Products with quantity ≤ min_stock are marked with a **yellow warning chip**.
- Out-of-stock items show a **red chip**.
- These alerts also appear on the dashboard.

---

## Inventory Transactions

Every stock change is logged in the `inventory_transactions` table. To view history:

1. Open a product detail.
2. Scroll to the **Transaction History** section.
3. See date, type (IN/OUT), quantity, and reference (e.g., sales order, purchase order).

---

## Best Practices

- Regularly review low-stock items and reorder.
- Use purchase orders to automate stock-in.
- Perform physical stock counts periodically and adjust via inventory adjustment.
- Keep product descriptions clear for sales and QC teams.

---

## Frequently Asked Questions

**Q: Can I delete a product?**  
A: Deleting is not recommended; instead, set quantity to 0. Products linked to historical orders should remain.

**Q: How do I handle damaged goods?**  
A: Perform a stock adjustment with negative quantity and note it in the description.

**Q: What happens if I try to create an order with insufficient stock?**  
A: The system will alert you and prevent the order until stock is available.