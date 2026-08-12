# Database Schema

## Overview
Database: PostgreSQL 15
Schema name: public

## Tables

### users
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| username      | VARCHAR(50)    | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255)   | NOT NULL |
| email         | VARCHAR(100)   | UNIQUE, NOT NULL |
| full_name     | VARCHAR(100)   | |
| role          | VARCHAR(50)    | DEFAULT 'user' |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### customers
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| name          | VARCHAR(100)   | NOT NULL |
| email         | VARCHAR(100)   | |
| phone         | VARCHAR(20)    | |
| address       | TEXT           | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### suppliers
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| name          | VARCHAR(100)   | NOT NULL |
| email         | VARCHAR(100)   | |
| phone         | VARCHAR(20)    | |
| address       | TEXT           | |
| is_approved   | BOOLEAN        | DEFAULT FALSE |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### products
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| name          | VARCHAR(100)   | NOT NULL |
| description   | TEXT           | |
| sku           | VARCHAR(50)    | UNIQUE, NOT NULL |
| quantity      | INTEGER        | DEFAULT 0 |
| min_stock     | INTEGER        | DEFAULT 5 |
| price         | DECIMAL(10,2)  | |
| unit          | VARCHAR(20)    | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### sales_quotations
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| customer_id   | INTEGER        | REFERENCES customers(id) |
| user_id       | INTEGER        | REFERENCES users(id) |
| quotation_number | VARCHAR(50) | UNIQUE, NOT NULL |
| total_amount  | DECIMAL(10,2)  | |
| status        | VARCHAR(20)    | DEFAULT 'draft' |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| updated_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### sales_orders
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| customer_id   | INTEGER        | REFERENCES customers(id) |
| user_id       | INTEGER        | REFERENCES users(id) |
| order_number  | VARCHAR(50)    | UNIQUE, NOT NULL |
| total_amount  | DECIMAL(10,2)  | |
| status        | VARCHAR(20)    | DEFAULT 'pending' |
| payment_status| VARCHAR(20)    | DEFAULT 'unpaid' |
| delivery_status | VARCHAR(20)  | DEFAULT 'pending' |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| updated_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### purchase_orders
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| supplier_id   | INTEGER        | REFERENCES suppliers(id) |
| user_id       | INTEGER        | REFERENCES users(id) |
| po_number     | VARCHAR(50)    | UNIQUE, NOT NULL |
| total_amount  | DECIMAL(10,2)  | |
| status        | VARCHAR(20)    | DEFAULT 'pending' |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| updated_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### service_orders
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| customer_id   | INTEGER        | REFERENCES customers(id) |
| user_id       | INTEGER        | REFERENCES users(id) |
| service_number| VARCHAR(50)    | UNIQUE, NOT NULL |
| description   | TEXT           | |
| assigned_to   | INTEGER        | REFERENCES users(id) |
| status        | VARCHAR(20)    | DEFAULT 'pending' |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| updated_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### work_orders
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| sales_order_id| INTEGER        | REFERENCES sales_orders(id) |
| product_id    | INTEGER        | REFERENCES products(id) |
| quantity      | INTEGER        | |
| status        | VARCHAR(20)    | DEFAULT 'pending' |
| started_at    | TIMESTAMP      | |
| completed_at  | TIMESTAMP      | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### quality_controls
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| work_order_id | INTEGER        | REFERENCES work_orders(id) |
| product_id    | INTEGER        | REFERENCES products(id) |
| quantity_tested| INTEGER       | |
| result        | VARCHAR(20)    | DEFAULT 'pending' |
| notes         | TEXT           | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### invoices
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| sales_order_id| INTEGER        | REFERENCES sales_orders(id) |
| invoice_number| VARCHAR(50)    | UNIQUE, NOT NULL |
| total_amount  | DECIMAL(10,2)  | |
| status        | VARCHAR(20)    | DEFAULT 'unpaid' |
| due_date      | DATE           | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| paid_at       | TIMESTAMP      | |

### inventory_transactions
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| product_id    | INTEGER        | REFERENCES products(id) |
| transaction_type| VARCHAR(20) | |
| quantity      | INTEGER        | |
| reference_type| VARCHAR(50)    | |
| reference_id  | INTEGER        | |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

### notifications
| Column        | Type           | Constraints |
|---------------|----------------|-------------|
| id            | SERIAL         | PRIMARY KEY |
| user_id       | INTEGER        | REFERENCES users(id) |
| type          | VARCHAR(50)    | |
| message       | TEXT           | |
| is_read       | BOOLEAN        | DEFAULT FALSE |
| created_at    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |

## Indices

Recommended indexes for performance:
- `idx_sales_orders_status` ON sales_orders(status)
- `idx_purchase_orders_status` ON purchase_orders(status)
- `idx_products_quantity` ON products(quantity)
- `idx_invoices_status` ON invoices(status)
- `idx_inventory_transactions_product_id` ON inventory_transactions(product_id)
- `idx_notifications_user_id` ON notifications(user_id)