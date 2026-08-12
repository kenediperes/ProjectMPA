// backend/src/utils/emailService.js
const nodemailer = require('nodemailer');
const { formatCurrency, generateOrderNumber } = require('./helpers');

// --- Create Transporter (configured via .env) ---
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * Send a generic email
 */
const sendMail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"ERP System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL] Sent to ${to} - Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send:', error.message);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
};

// --- ERP Specific Templates ---

/**
 * Send Invoice to Customer
 */
const sendInvoiceEmail = async (invoice, customer, salesOrder, items) => {
  const subject = `Invoice #${invoice.invoiceNumber} from Your Company`;
  const totalFormatted = formatCurrency(invoice.totalAmount, 'USD');

  let itemRows = items
    .map(
      (item) =>
        `<tr>
          <td>${item.Product?.name || 'Product'}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.unitPrice)}</td>
          <td>${formatCurrency(item.quantity * item.unitPrice)}</td>
        </tr>`
    )
    .join('');

  const html = `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2>Invoice #${invoice.invoiceNumber}</h2>
        <p><strong>Customer:</strong> ${customer.name}</p>
        <p><strong>Issue Date:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
        <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${invoice.status}</p>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr><td colspan="3" align="right"><strong>Total:</strong></td><td><strong>${totalFormatted}</strong></td></tr>
          </tfoot>
        </table>
        <br>
        <p><strong>Payment Terms:</strong> ${invoice.paymentTerms}</p>
        <p>Please make payment by the due date. For any queries, contact our support.</p>
        <hr>
        <p>This is an automatically generated email from the ERP System.</p>
      </body>
    </html>
  `;

  return sendMail({ to: customer.email, subject, html });
};

/**
 * Send Payment Reminder (Automatic Reminder as per flowchart)
 */
const sendPaymentReminder = async (invoice, customer, daysOverdue) => {
  const subject = `REMINDER: Invoice #${invoice.invoiceNumber} is ${daysOverdue} days overdue`;
  const totalFormatted = formatCurrency(invoice.totalAmount, 'USD');

  const html = `
    <html>
      <body>
        <h2>Payment Reminder</h2>
        <p>Dear ${customer.name},</p>
        <p>This is a friendly reminder that invoice <strong>#${invoice.invoiceNumber}</strong> for <strong>${totalFormatted}</strong> is now <strong>${daysOverdue} days overdue</strong>.</p>
        <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
        <p>Please settle the amount at your earliest convenience to avoid further escalation.</p>
        <br>
        <p>Thank you for your business.</p>
      </body>
    </html>
  `;

  return sendMail({ to: customer.email, subject, html });
};

/**
 * Send Purchase Order to Supplier
 */
const sendPurchaseOrderEmail = async (purchaseOrder, supplier, items) => {
  const subject = `Purchase Order #${purchaseOrder.poNumber} from Your Company`;

  let itemRows = items
    .map(
      (item) =>
        `<tr>
          <td>${item.Product?.name || 'Product'}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.unitCost)}</td>
          <td>${formatCurrency(item.quantity * item.unitCost)}</td>
        </tr>`
    )
    .join('');

  const html = `
    <html>
      <body>
        <h2>Purchase Order #${purchaseOrder.poNumber}</h2>
        <p><strong>Supplier:</strong> ${supplier.name}</p>
        <p><strong>Order Date:</strong> ${new Date(purchaseOrder.orderDate).toLocaleDateString()}</p>
        <p><strong>Expected Delivery:</strong> ${new Date(purchaseOrder.deliveryDate).toLocaleDateString()}</p>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr><th>Product</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        <br>
        <p>Please confirm receipt and delivery schedule.</p>
      </body>
    </html>
  `;

  return sendMail({ to: supplier.email, subject, html });
};

/**
 * Send Financial Report (for Management Dashboard)
 */
const sendFinancialReport = async (to, reportData, dateRange) => {
  const subject = `Financial Report: ${dateRange.start} to ${dateRange.end}`;

  const html = `
    <html>
      <body>
        <h2>Financial Report</h2>
        <p><strong>Period:</strong> ${dateRange.start} - ${dateRange.end}</p>
        <ul>
          <li><strong>Total Revenue:</strong> ${formatCurrency(reportData.totalRevenue)}</li>
          <li><strong>Total Expenses:</strong> ${formatCurrency(reportData.totalExpenses)}</li>
          <li><strong>Net Profit:</strong> ${formatCurrency(reportData.netProfit)}</li>
          <li><strong>Outstanding Invoices:</strong> ${reportData.outstandingCount}</li>
        </ul>
        <p>For detailed breakdown, please log in to the ERP Dashboard.</p>
      </body>
    </html>
  `;

  return sendMail({ to, subject, html });
};

module.exports = {
  sendMail,
  sendInvoiceEmail,
  sendPaymentReminder,
  sendPurchaseOrderEmail,
  sendFinancialReport,
};