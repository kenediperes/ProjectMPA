import React, { useState } from 'react';

const InvoicePayment = ({ invoice, onPay, onClose, isLoading }) => {
  const [paymentData, setPaymentData] = useState({
    amount: invoice?.total || 0,
    paymentDate: new Date().toISOString().split('T')[0],
    method: 'cash',
    reference: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  if (!invoice) {
    return <div className="error-message">Invoice tidak ditemukan.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      newErrors.amount = 'Jumlah pembayaran harus lebih dari 0';
    }
    if (parseFloat(paymentData.amount) > invoice.total) {
      newErrors.amount = `Jumlah pembayaran tidak boleh melebihi total invoice (${formatCurrency(invoice.total)})`;
    }
    if (!paymentData.paymentDate) newErrors.paymentDate = 'Tanggal pembayaran wajib diisi';
    return newErrors;
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onPay(invoice.id, {
      ...paymentData,
      amount: parseFloat(paymentData.amount),
    });
  };

  const remaining = invoice.total - (invoice.paidAmount || 0);

  return (
    <div className="invoice-payment-container">
      <div className="payment-header">
        <h3>Pembayaran Invoice</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="invoice-summary">
        <div><strong>Invoice:</strong> {invoice.invoiceNumber}</div>
        <div><strong>Pelanggan:</strong> {invoice.customer?.name}</div>
        <div><strong>Total Invoice:</strong> {formatCurrency(invoice.total)}</div>
        <div><strong>Sudah Dibayar:</strong> {formatCurrency(invoice.paidAmount || 0)}</div>
        <div><strong>Sisa:</strong> {formatCurrency(remaining)}</div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Jumlah Pembayaran <span className="required">*</span></label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            min="0"
            step="1000"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>Tanggal Pembayaran <span className="required">*</span></label>
          <input
            type="date"
            name="paymentDate"
            value={paymentData.paymentDate}
            onChange={handleChange}
            className={errors.paymentDate ? 'error' : ''}
          />
          {errors.paymentDate && <span className="error-text">{errors.paymentDate}</span>}
        </div>

        <div className="form-group">
          <label>Metode Pembayaran</label>
          <select name="method" value={paymentData.method} onChange={handleChange}>
            <option value="cash">Tunai</option>
            <option value="bank_transfer">Transfer Bank</option>
            <option value="credit_card">Kartu Kredit</option>
            <option value="ewallet">E-Wallet</option>
            <option value="check">Cek</option>
          </select>
        </div>

        <div className="form-group">
          <label>Referensi (opsional)</label>
          <input
            type="text"
            name="reference"
            value={paymentData.reference}
            onChange={handleChange}
            placeholder="Nomor referensi / bukti"
          />
        </div>

        <div className="form-group">
          <label>Catatan (opsional)</label>
          <textarea
            name="notes"
            rows="2"
            value={paymentData.notes}
            onChange={handleChange}
            placeholder="Catatan pembayaran"
          />
        </div>

        <div className="payment-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
          </button>
        </div>
      </form>

      <style>{`
        .invoice-payment-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }
        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .payment-header h3 { margin: 0; color: #1f2937; }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0 0.5rem;
        }
        .close-btn:hover { color: #1f2937; }
        .invoice-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .invoice-summary div { display: flex; justify-content: space-between; }
        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .payment-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .payment-form .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .required { color: #ef4444; }
        .payment-form .form-group input, .payment-form .form-group select, .payment-form .form-group textarea {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .payment-form .form-group input:focus, .payment-form .form-group select:focus, .payment-form .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .payment-form .form-group input.error, .payment-form .form-group select.error {
          border-color: #ef4444;
          background: #fef2f2;
        }
        .error-text { color: #ef4444; font-size: 0.8rem; }
        .payment-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .btn-cancel, .btn-submit {
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .btn-cancel { background: #f3f4f6; color: #4b5563; }
        .btn-cancel:hover { background: #e5e7eb; }
        .btn-submit { background: #3b82f6; color: #fff; }
        .btn-submit:hover:not(:disabled) { background: #2563eb; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-message {
          padding: 1rem;
          color: #ef4444;
          background: #fef2f2;
          border-radius: 8px;
          text-align: center;
        }
        @media (max-width: 480px) {
          .invoice-summary { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default InvoicePayment;