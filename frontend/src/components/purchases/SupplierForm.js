import React, { useState } from 'react';
import { useApi } from '../../hooks';

const SupplierForm = ({ onSuccess, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: '',
      bankAccount: '',
      approvalStatus: 'pending',
    }
  );
  const [loading, setLoading] = useState(false);
  const { request } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = initialData ? `/suppliers/${initialData.id}` : '/suppliers';
    const method = initialData ? 'PUT' : 'POST';
    const res = await request({ url, method, data: formData });
    setLoading(false);
    if (res.success) {
      onSuccess && onSuccess(res.data);
      if (!initialData) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          taxId: '',
          bankAccount: '',
          approvalStatus: 'pending',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="supplier-form">
      <h3>{initialData ? 'Edit Supplier' : 'Add New Supplier'}</h3>
      <div className="form-group">
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
        />
      </div>
      <div className="form-group">
        <label>Tax ID</label>
        <input
          type="text"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Bank Account</label>
        <input
          type="text"
          name="bankAccount"
          value={formData.bankAccount}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Approval Status</label>
        <select
          name="approvalStatus"
          value={formData.approvalStatus}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default SupplierForm;