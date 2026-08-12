/**
 * ERP System Database Seeder
 * ==========================
 * This script seeds the database with initial data:
 * - Admin user
 * - Sample customers
 * - Sample suppliers
 * - Sample products
 * - Sample sales orders, purchase orders, invoices, etc.
 *
 * Usage: node scripts/seed-database.js [--force]
 *   --force : drop and recreate tables before seeding (dangerous)
 */

const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Load environment variables from backend/.env
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'erp_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

const force = process.argv.includes('--force');

// Helper to generate random dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
    const client = await pool.connect();
    try {
        console.log('🌱 Starting database seeding...');

        // --- Clear existing data (if force) ---
        if (force) {
            console.log('⚠️  Force mode: dropping all tables...');
            await client.query(`
                DO $$ DECLARE
                    r RECORD;
                BEGIN
                    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    END LOOP;
                END $$;
            `);
            console.log('✅ Tables dropped.');
            // Recreate tables? Usually migrations handle this.
            // Assume migrations have been run before seeding.
            console.log('ℹ️  Please run migrations first: npm run migrate');
            console.log('ℹ️  Then re-run this seeder without --force.');
            return;
        }

        // --- 1. Users ---
        console.log('👤 Seeding users...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const userResult = await client.query(`
            INSERT INTO users (username, password_hash, email, full_name, role)
            VALUES 
                ('admin', $1, 'admin@erp.com', 'Administrator', 'admin'),
                ('manager', $1, 'manager@erp.com', 'Manager', 'manager'),
                ('staff', $1, 'staff@erp.com', 'Staff', 'staff')
            ON CONFLICT (username) DO NOTHING
            RETURNING id;
        `, [hashedPassword]);
        console.log(`   ✅ ${userResult.rowCount} users inserted.`);

        // Get admin id
        const admin = await client.query(`SELECT id FROM users WHERE username = 'admin'`);
        const adminId = admin.rows[0]?.id || 1;

        // --- 2. Customers ---
        console.log('👥 Seeding customers...');
        await client.query(`
            INSERT INTO customers (name, email, phone, address)
            VALUES 
                ('PT Maju Jaya', 'info@majujaya.com', '081234567890', 'Jl. Sudirman No. 1, Jakarta'),
                ('CV Sumber Rezeki', 'cs@sumberrezeki.com', '082345678901', 'Jl. Gatot Subroto No. 2, Bandung'),
                ('UD Berkah Abadi', 'berkah@abadi.com', '083456789012', 'Jl. Ahmad Yani No. 3, Surabaya'),
                ('Toko Elektronik Sentosa', 'sentosa@elektronik.com', '084567890123', 'Jl. Pahlawan No. 4, Medan'),
                ('PT Teknologi Nusantara', 'tech@nusantara.com', '085678901234', 'Jl. Diponegoro No. 5, Yogyakarta')
            ON CONFLICT (email) DO NOTHING;
        `);

        // --- 3. Suppliers ---
        console.log('🏭 Seeding suppliers...');
        await client.query(`
            INSERT INTO suppliers (name, email, phone, address, is_approved)
            VALUES 
                ('PT Supplier Utama', 'supplier1@utama.com', '081111111111', 'Jl. Industri No. 10, Tangerang', true),
                ('CV Bahan Baku', 'bahan@baku.com', '082222222222', 'Jl. Raya No. 20, Bekasi', true),
                ('UD Material Jaya', 'material@jaya.com', '083333333333', 'Jl. Kemayoran No. 30, Jakarta', true),
                ('PT Komponen Elektronik', 'komponen@elektronik.com', '084444444444', 'Jl. Cakung No. 40, Jakarta', false)
            ON CONFLICT (email) DO NOTHING;
        `);

        // --- 4. Products ---
        console.log('📦 Seeding products...');
        const products = [
            { name: 'Laptop Pro 14', sku: 'LP-001', qty: 50, min: 10, price: 15000000, unit: 'pcs' },
            { name: 'Smartphone X', sku: 'SP-002', qty: 100, min: 20, price: 5000000, unit: 'pcs' },
            { name: 'Tablet Mini', sku: 'TB-003', qty: 30, min: 5, price: 3000000, unit: 'pcs' },
            { name: 'Headset Bluetooth', sku: 'HS-004', qty: 200, min: 50, price: 500000, unit: 'pcs' },
            { name: 'Charger Fast 65W', sku: 'CH-005', qty: 500, min: 100, price: 250000, unit: 'pcs' },
            { name: 'Keyboard Mechanical', sku: 'KB-006', qty: 75, min: 15, price: 850000, unit: 'pcs' },
            { name: 'Monitor 24"', sku: 'MN-007', qty: 40, min: 10, price: 2200000, unit: 'pcs' },
            { name: 'Mouse Wireless', sku: 'MW-008', qty: 150, min: 30, price: 200000, unit: 'pcs' },
        ];
        for (const p of products) {
            await client.query(`
                INSERT INTO products (name, description, sku, quantity, min_stock, price, unit)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (sku) DO NOTHING;
            `, [p.name, `Description for ${p.name}`, p.sku, p.qty, p.min, p.price, p.unit]);
        }

        // --- 5. Sales Orders ---
        console.log('🛒 Seeding sales orders...');
        const customers = await client.query(`SELECT id FROM customers LIMIT 3`);
        const customerIds = customers.rows.map(r => r.id);
        for (let i = 0; i < 10; i++) {
            const custId = customerIds[Math.floor(Math.random() * customerIds.length)];
            const total = Math.floor(Math.random() * 20000000) + 5000000;
            const statuses = ['pending', 'processing', 'completed', 'cancelled'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const paymentStatus = ['unpaid', 'paid'][Math.floor(Math.random() * 2)];
            const deliveryStatus = ['pending', 'shipped', 'delivered'][Math.floor(Math.random() * 3)];
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO sales_orders 
                (customer_id, user_id, order_number, total_amount, status, payment_status, delivery_status, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [
                custId,
                adminId,
                `SO-${Date.now() + i}`,
                total,
                status,
                paymentStatus,
                deliveryStatus,
                createdAt
            ]);
        }

        // --- 6. Purchase Orders ---
        console.log('📦 Seeding purchase orders...');
        const suppliers = await client.query(`SELECT id FROM suppliers WHERE is_approved = true LIMIT 3`);
        const supplierIds = suppliers.rows.map(r => r.id);
        for (let i = 0; i < 5; i++) {
            const suppId = supplierIds[Math.floor(Math.random() * supplierIds.length)];
            const total = Math.floor(Math.random() * 10000000) + 2000000;
            const statuses = ['pending', 'approved', 'received', 'cancelled'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO purchase_orders (supplier_id, user_id, po_number, total_amount, status, created_at)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [
                suppId,
                adminId,
                `PO-${Date.now() + i}`,
                total,
                status,
                createdAt
            ]);
        }

        // --- 7. Service Orders ---
        console.log('🔧 Seeding service orders...');
        for (let i = 0; i < 8; i++) {
            const custId = customerIds[Math.floor(Math.random() * customerIds.length)];
            const desc = `Service request #${i+1}`;
            const statuses = ['pending', 'in_progress', 'completed', 'cancelled'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const assignedTo = [adminId, null][Math.floor(Math.random() * 2)];
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO service_orders (customer_id, user_id, service_number, description, assigned_to, status, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [
                custId,
                adminId,
                `SRV-${Date.now() + i}`,
                desc,
                assignedTo,
                status,
                createdAt
            ]);
        }

        // --- 8. Work Orders ---
        console.log('⚙️ Seeding work orders...');
        const salesOrders = await client.query(`SELECT id FROM sales_orders LIMIT 5`);
        const soIds = salesOrders.rows.map(r => r.id);
        const productsList = await client.query(`SELECT id FROM products LIMIT 5`);
        const prodIds = productsList.rows.map(r => r.id);
        for (let i = 0; i < 6; i++) {
            const soId = soIds[Math.floor(Math.random() * soIds.length)];
            const prodId = prodIds[Math.floor(Math.random() * prodIds.length)];
            const qty = Math.floor(Math.random() * 10) + 1;
            const statuses = ['pending', 'in_progress', 'completed', 'qc_passed', 'qc_failed'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO work_orders (sales_order_id, product_id, quantity, status, created_at)
                VALUES ($1, $2, $3, $4, $5)
            `, [soId, prodId, qty, status, createdAt]);
        }

        // --- 9. Quality Controls ---
        console.log('🔬 Seeding quality controls...');
        const workOrders = await client.query(`SELECT id, product_id FROM work_orders LIMIT 5`);
        for (const wo of workOrders.rows) {
            const result = ['passed', 'failed', 'pending'][Math.floor(Math.random() * 3)];
            const qty = Math.floor(Math.random() * 20) + 5;
            await client.query(`
                INSERT INTO quality_controls (work_order_id, product_id, quantity_tested, result)
                VALUES ($1, $2, $3, $4)
            `, [wo.id, wo.product_id, qty, result]);
        }

        // --- 10. Invoices ---
        console.log('📄 Seeding invoices...');
        const soForInvoice = await client.query(`SELECT id, total_amount FROM sales_orders WHERE payment_status = 'unpaid' LIMIT 5`);
        for (const so of soForInvoice.rows) {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);
            const status = ['unpaid', 'paid', 'overdue'][Math.floor(Math.random() * 3)];
            await client.query(`
                INSERT INTO invoices (sales_order_id, invoice_number, total_amount, status, due_date)
                VALUES ($1, $2, $3, $4, $5)
            `, [
                so.id,
                `INV-${Date.now() + Math.random()}`,
                so.total_amount,
                status,
                dueDate
            ]);
        }

        // --- 11. Notifications ---
        console.log('🔔 Seeding notifications...');
        const users = await client.query(`SELECT id FROM users`);
        const userIds = users.rows.map(r => r.id);
        for (let i = 0; i < 10; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const types = ['info', 'warning', 'success'];
            const type = types[Math.floor(Math.random() * types.length)];
            const msg = `Notification #${i+1}: This is a sample notification.`;
            const isRead = Math.random() > 0.5;
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO notifications (user_id, type, message, is_read, created_at)
                VALUES ($1, $2, $3, $4, $5)
            `, [userId, type, msg, isRead, createdAt]);
        }

        // --- 12. Inventory Transactions ---
        console.log('📊 Seeding inventory transactions...');
        const allProducts = await client.query(`SELECT id FROM products`);
        const allProdIds = allProducts.rows.map(r => r.id);
        for (let i = 0; i < 20; i++) {
            const prodId = allProdIds[Math.floor(Math.random() * allProdIds.length)];
            const type = ['in', 'out', 'adjustment'][Math.floor(Math.random() * 3)];
            const qty = Math.floor(Math.random() * 50) + 1;
            const refType = ['sales_order', 'purchase_order', 'adjustment'][Math.floor(Math.random() * 3)];
            const refId = Math.floor(Math.random() * 100) + 1;
            const createdAt = randomDate(new Date(2025, 0, 1), new Date());
            await client.query(`
                INSERT INTO inventory_transactions (product_id, transaction_type, quantity, reference_type, reference_id, created_at)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [prodId, type, qty, refType, refId, createdAt]);
        }

        console.log('✅ Database seeding completed successfully!');
        console.log('📌 Sample login: admin / admin123');

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    } finally {
        await client.release();
        await pool.end();
    }
}

// Run seeder
seed().catch(err => {
    console.error(err);
    process.exit(1);
});