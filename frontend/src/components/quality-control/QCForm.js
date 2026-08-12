import React, { useState, useEffect } from 'react';

const QCForm = ({ initialData, products, inspectors, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    productId: '',
    inspector: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    parameters: [{ name: '', standard: '', actual: '', status: '' }],
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        productId: initialData.productId || '',
        inspector: initialData.inspector || '',
        inspectionDate: initialData.inspectionDate ? new Date(initialData.inspectionDate).toISOString().split('T')[0] : '',
        parameters: initialData.parameters || [{ name: '', standard: '', actual: '', status: '' }],
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleParameterChange = (index, field, value) => {
    const newParams = [...formData.parameters];
    newParams[index][field] = value;
    // Auto-calculate status based on actual vs standard (simplified)
    if (field === 'actual' && newParams[index].standard) {
      const standard = parseFloat(newParams[index].standard);
      const actual = parseFloat(value);
      if (!isNaN(standard) && !isNaN(actual)) {
        // Simple tolerance: if actual within +/- 10% of standard, pass
        const tolerance = standard * 0.1;
        newParams[index].status = Math.abs(actual - standard) <= tolerance ? 'passed' : 'failed';
      }
    }
    setFormData(prev => ({ ...prev, parameters: newParams }));
  };

  const addParameter = () => {
    setFormData(prev => ({
      ...prev,
      parameters: [...prev.parameters, { name: '', standard: '', actual: '', status: '' }]
    }));
  };

  const removeParameter = (index) => {
    if (formData.parameters.length <= 1) return;
    const newParams = formData.parameters.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, parameters: newParams }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productId) newErrors.productId = 'Produk wajib dipilih';
    if (!formData.inspector.trim()) newErrors.inspector = 'Nama inspektur wajib diisi';
    if (!formData.inspectionDate) newErrors.inspectionDate = 'Tanggal inspeksi wajib diisi';
    if (formData.parameters.some(p => !p.name.trim() || !p.standard || !p.actual)) {
      newErrors.parameters = 'Semua parameter harus memiliki nama, standar, dan nilai aktual';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="qc-form">
      <h3>{initialData ? 'Edit Inspeksi QC' : 'Buat Inspeksi QC Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Produk <span className="required">*</span></label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className={errors.productId ? 'error' : ''}
            >
              <option value="">Pilih Produk</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
              ))}
            </select>
            {errors.productId && <span className="error-text">{errors.productId}</span>}
          </div>

          <div className="form-group">
            <label>Inspektur <span className="required">*</span></label>
            <input
              type="text"
              name="inspector"
              value={formData.inspector}
              onChange={handleChange}
              placeholder="Nama inspektur"
              className={errors.inspector ? 'error' : ''}
              list="inspector-list"
            />
            <datalist id="inspector-list">
              {inspectors.map(ins => (
                <option key={ins} value={ins} />
              ))}
            </datalist>
            {errors.inspector && <span className="error-text">{errors.inspector}</span>}
          </div>

          <div className="form-group">
            <label>Tanggal Inspeksi <span className="required">*</span></label>
            <input
              type="date"
              name="inspectionDate"
              value={formData.inspectionDate}
              onChange={handleChange}
              className={errors.inspectionDate ? 'error' : ''}
            />
            {errors.inspectionDate && <span className="error-text">{errors.inspectionDate}</span>}
          </div>
        </div>

        <div className="parameters-section">
          <label>Parameter Inspeksi <span className="required">*</span></label>
          {formData.parameters.map((param, index) => (
            <div key={index} className="parameter-row">
              <input
                type="text"
                placeholder="Nama parameter"
                value={param.name}
                onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                className={errors.parameters ? 'error' : ''}
              />
              <input
                type="number"
                step="any"
                placeholder="Standar"
                value={param.standard}
                onChange={(e) => handleParameterChange(index, 'standard', e.target.value)}
                className={errors.parameters ? 'error' : ''}
              />
              <input
                type="number"
                step="any"
                placeholder="Nilai aktual"
                value={param.actual}
                onChange={(e) => handleParameterChange(index, 'actual', e.target.value)}
                className={errors.parameters ? 'error' : ''}
              />
              <span className={`param-status ${param.status === 'passed' ? 'passed' : param.status === 'failed' ? 'failed' : ''}`}>
                {param.status || '?'}
              </span>
              <button type="button" onClick={() => removeParameter(index)} className="btn-remove">✕</button>
            </div>
          ))}
          <button type="button" onClick={addParameter} className="btn-add-param">+ Tambah Parameter</button>
          {errors.parameters && <span className="error-text">{errors.parameters}</span>}
        </div>

        <div className="form-group">
          <label>Catatan</label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Catatan tambahan tentang inspeksi"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn-submit">
            {isLoading ? 'Menyimpan...' : initialData ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      </form>

      <style>{`
        .qc-form {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          max-width: 800px;
          margin: 0 auto;
        }
        .qc-form h3 { margin: 0 0 1.5rem 0; color: #1f2937; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .form-group label { font-weight: 500; font-size: 0.9rem; color: #374151; }
        .required { color: #ef4444; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .form-group input.error, .form-group select.error, .form-group textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }
        .error-text { color: #ef4444; font-size: 0.8rem; }
        .parameters-section {
          margin: 1rem 0;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }
        .parameters-section > label {
          font-weight: 500;
          display: block;
          margin-bottom: 0.5rem;
        }
        .parameter-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .parameter-row input {
          flex: 1;
          min-width: 80px;
          padding: 0.4rem 0.6rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #fff;
          font-size: 0.9rem;
        }
        .parameter-row input.error { border-color: #ef4444; background: #fef2f2; }
        .param-status {
          min-width: 40px;
          font-weight: 600;
          text-align: center;
          font-size: 0.9rem;
        }
        .param-status.passed { color: #10b981; }
        .param-status.failed { color: #ef4444; }
        .btn-remove {
          background: #fee2e2;
          border: none;
          border-radius: 6px;
          padding: 0.2rem 0.6rem;
          cursor: pointer;
          color: #991b1b;
          font-weight: bold;
        }
        .btn-add-param {
          background: #dbeafe;
          border: none;
          border-radius: 6px;
          padding: 0.4rem 1rem;
          cursor: pointer;
          color: #1e40af;
          font-weight: 500;
          margin-top: 0.5rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
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
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .parameter-row { flex-direction: column; align-items: stretch; }
          .parameter-row input { min-width: unset; }
        }
      `}</style>
    </div>
  );
};

export default QCForm;