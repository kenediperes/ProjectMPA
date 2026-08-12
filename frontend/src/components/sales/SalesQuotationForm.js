import React, { useState, useEffect } from 'react';

const SalesQuotationForm = ({ initialData, customers, products, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    quotationDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
    items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    discount: 0,
    tax: 0,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerId: initialData.customerId || '',
        quotationDate: initialData.quotationDate ? new Date(initialData.quotationString().split('T')[0]Date).toISOString().split('T')[0]Date).toISOString().split('T')[0] : '',
        validUntil: initialDataDate).toISOString().split('T')[0] : '',
        validUntil: initialData : '',
        validUntil: initialData : '',
        validUntil: initialData.validUntil ? new Date(initial.validUntil ? new Date(initial.validUntil ? new Date(initial.validUntil ? new Date(initialData.validUntil).toISOStringData.validUntil).toISOString().splitData.validUntil).toISOString().split('TData.validUntil).toISOString().split('T().split('T')[0] : '',
        items:('T')[0] : '',
        items:')[0] : '',
        items:')[0] : '',
        items: initialData.items || [{ productId initialData.items || [{ productId initialData.items || [{ productId initialData.items || [{ productId: '', quantity: '', quantity: 1, unitPrice:: '', quantity: 1, unit: '', quantity: 1, unitPrice: 0: 1, unitPrice: 0 0 }],
        discount: initialData.dPrice: 0 }],
        discount }],
        discount: initialData.d }],
        discount: initialData.discount || 0,
        tax:iscount || 0,
        tax:: initialData.discount || 0,
        tax:iscount || 0,
        tax: initialData.tax || 0 initialData.tax || 0 initialData.tax || 0 initialData.tax || 0,
        notes: initialData.notes || '',
,
        notes: initialData.notes ||,
        notes: initialData.notes ||,
        notes: initialData.notes ||      });
    }
  }, [initialData]);

  '',
      });
    }
  }, '',
      });
    }
  }, [initialData]);

  const handleChange = '',
      });
    }
  }, [initialData]);

  const handleChange = (e const handleChange = ( [initialData]);

  const handleChange = (e) => {
    const { name) => {
    const { name, value }e) => {
    const { name, value } (e) => {
    const { name,, value } = e.target;
    setFormData = e.target;
    setFormData = e.target;
    setFormData value } = e.target;
    setFormData(prev => ({ ...prev,(prev => ({ ...prev,(prev => ({ ...prev, [name]: value(prev => ({ ...prev, [name]: value [name]: value }));
    if (errors [name]: value }));
    if (errors }));
    if (errors[name]) setErrors }));
    if (errors[name]) setErrors[name]) setErrors(prev => ({ ...prev,[name]) setErrors(prev => ({(prev => ({ ...prev,(prev => ({ ...prev, [name]: '' }));
  };

  const ...prev, [name]: '' }));
  };

  const [name]: '' }));
  };

  const [name]: '' }));
  };

  const handleItemChange = (index, field handleItemChange = (index, field handleItemChange = (index, field, value) => handleItemChange = (index, field, value) =>, value) => {
    const new, value) => {
    const new {
    const newItems = [...form {
    const newItems = [...formItems = [...formData.items];
   Items = [...formData.items];
   Data.items];
    newItems[indexData.items];
    newItems[index newItems[index][field] = value;
    if ( newItems[index][field] = value;
    if (][field] = value;
    if (][field] = value;
    if (field === 'productId') {
     field === 'productId') {
     field === 'productId') {
      const product = productsfield === 'productId') {
      const product = products const product = products.find(p => p const product = products.find(p => p.find(p => p.id === value.find(p => p.id === value.id === value);
      newItems[index.id === value);
      newItems[index].unitPrice = product ? product.price);
      newItems[index].unitPrice =);
      newItems[index].unitPrice = product ? product.price : 0].unitPrice = product ? product.price : 0;
    }
    set product ? product.price : 0;
    }
    setFormData(prev : 0;
    }
    setFormData(prev => ({ ...prev,;
    }
    setFormData(prev => ({ ...prev, items: new => ({ ...prev, items: newFormData(prev => ({ ...prev, items: new items: newItems }));
  };

  const addItems }));
  };

  const addItem = ()Items }));
  };

  const addItem = () =>Items }));
  };

  const addItemItem = () => {
    setFormData => {
    setFormData(prev => {
    setFormData(prev => = () => {
    setFormData(prev => ({
      ...prev ({
      ...prev,
      items: [... ({
      ...prev,
      items: [...(prev => ({
      ...prev,
      items: [...prev.items, {prev.items, { productId: '',prev.items, { productId: '',,
      items: [...prev.items, { productId: '', productId: '', quantity: 1 quantity: 1, unitPrice: 0 } quantity: 1, unitPrice: 0 } quantity: 1, unitPrice: 0 }]
    }));
 , unitPrice: 0 }]
   ]
    }));
  };

  const removeItem]
    }));
  };

  const removeItem };

  const removeItem = (index) }));
  };

  const removeItem = (index) = (index) => {
    if = (index) => {
    if => {
    if (formData.items => {
    if (formData.items (formData.items.length <= 1 (formData.items.length <= 1.length <= 1) return;
    const newItems =.length <= 1) return;
   ) return;
    const newItems =) return;
    const newItems = formData.items.filter((_, i) const newItems = formData.items.filter formData.items.filter((_, i) => i !== index formData.items.filter((_, i) => i !== index => i !== index);
    setForm((_, i) => i !== index);
    setFormData(prev => ({ ...prev,);
    setFormData(prev =>);
    setFormData(prev =>Data(prev => ({ ...prev, items: newItems }));
  };

  ({ ...prev, items: newItems ({ ...prev, items: newItems }));
  };

  const calculateTotal = items: newItems }));
  };

  const calculateTotal = const calculateTotal = () => {
    }));
  };

  const calculateTotal = () => {
    const subtotal = () => {
    const subtotal = const subtotal = formData.items.reduce () => {
    const subtotal = formData.items.reduce formData.items.reduce((sum, item) => sum + formData.items.reduce((sum, item((sum, item) => sum +((sum, item) => sum + (item.quantity * item.unit) => sum + (item.quantity (item.quantity * item.unitPrice (item.quantity * item.unitPrice), 0);
    const discount * item.unitPrice), 0);
), 0);
    const discountPrice), 0);
    const discountAmt = (subtotal * form    const discountAmt = (subAmt = (subtotal * formData.discount)Amt = (subtotal * formData.discount)Data.discount) / 100;
   total * formData.discount) / 100 / 100;
    const taxAm / 100;
    const taxAm const taxAmt = (subtotal * formData;
    const taxAmt = (subt = (subtotal * formDatat = (subtotal * formData.tax) / 100;
    return subttotal * formData.tax) / 100.tax) / 100;
    return subt.tax) / 100;
   otal - discountAmt + taxAmt;
    return subtotal - discountAmt + taxAmt;
  };

  constotal - discountAmt + taxAmt return subtotal - discountAmt + taxAmt;
  };

  const validate = () => validate = () => {
    const new;
  };

  const validate = () => {
    const newErrors = {};
   ;
  };

  const validate = () => {
    const newErrors = {};
   Errors = {};
    if (!formData if (!formData.customerId) {
    const newErrors = {};
    if (!formData.customerId) if (!formData.customerId).customerId) newErrors.customerId = 'Pel newErrors.customerId = 'Pel newErrors.customerId = 'Pelanggan waj newErrors.customerId = 'Pelanggan wajanggan wajib dipilih';
   anggan wajib dipilih';
    if (!formDataib dipilih';
    if (!formDataib dipilih';
    if (!formData if (!formData.validUntil).validUntil) newErrors.valid.validUntil) newErrors.valid.validUntil) newErrors.valid newErrors.validUntil = 'TangUntil = 'Tanggal berlaku wajUntil = 'Tanggal berlaku wajUntil = 'Tanggal berlaku wajgal berlaku wajib diisi';
   ib diisi';
    if (formData.items.someib diisi';
    if (formib diisi';
    if (formData.items.some if (formData.items.some(item => !item.productId ||(item => !item.productId || itemData.items.some(item => !item.productId || item(item => !item.productId || item item.quantity < 1)) {
     .quantity < 1)) {
     .quantity < 1)) {
      newErrors.items = 'Setiap item.quantity < 1)) {
      newErrors.items = newErrors.items = 'Setiap item newErrors.items = 'Setiap item harus memiliki produk dan jumlah minimal 1 'Setiap item harus memiliki produk dan jumlah minimal 1';
    }
    harus memiliki produk dan jumlah minimal 1 harus memiliki produk dan jumlah minimal 1';
    }
   ';
    }
    if (formData.discount < if (formData.discount < ';
    }
    if (formData.discount <  if (formData.discount <  0 || formData.discount > 0 || formData.discount > 100) newErrors0 || formData.discount > 0 || formData.discount > 100) newErrors.discount = 'Diskon antara100) newErrors.discount = '.discount = 'Diskon antara100) newErrors.discount = 'Diskon antara 0-100% 0-100%';
    ifDiskon antara 0-100%';
 0-100%';
    if';
    if (formData.tax < 0 (formData.tax < 0    if (formData.tax < 0 (formData.tax < 0 || formData.tax > 100 || formData.tax > 100 || formData.tax > 100 || formData.tax > 100) newErrors.tax = 'Pajak antara ) newErrors.tax = 'P) newErrors.tax = 'Pajak antara ) newErrors.tax = 'Pajak antara 0-100%0-100%';
    return newajak antara 0-100%0-100%';
    return new';
    return newErrors;
 Errors;
  };

  const handleSubmit';
    return newErrors;
  };

  const handleSubmit = (e) =>Errors;
  };

  const handleSubmit };

  const handleSubmit = (e) => {
    = (e) => {
    e {
    e.preventDefault();
    const validation = (e) => {
    e e.preventDefault();
    const validationErrors =.preventDefault();
    const validationErrors = validateErrors = validate();
    if (.preventDefault();
    const validationErrors = validate();
    if (Object.keys( validate();
    if (();
    if (Object.keys(validationObject.keys(validationErrors).length >validationErrors).length > 0)Object.keys(validationErrors).length > 0Errors).length > 0) 0) {
      setErrors(validation {
      setErrors(validationErrors);
     ) {
      setErrors(validationErrors);
      {
      setErrors(validationErrors);
     Errors);
      return;
    }
    onSubmit({
      return;
    }
    onSubmit({
      return;
    }
    onSubmit({
      ...formData,
      total: calculate return;
    }
    onSubmit({
      ...formData,
      total: calculate ...formData,
      total: calculate ...formData,
      total: calculateTotal(),
      itemsTotal(),
      itemsTotal(),
      itemsTotal(),
      items: formData.items.map(item =>: formData.items.map(item => ({
        ...item: formData.items.map(item =>: formData.items.map(item => ({
        ...item ({
        ...item,
        quantity: parseInt(item.,
        quantity: parseInt(item.quantity ({
        ...item,
        quantity: parseInt(item.quantity),
        unitPrice: parse,
        quantity: parseInt(item.quantityquantity),
        unitPrice: parseFloat(item.),
        unitPrice: parseFloat(item.Float(item.unitPrice),
      })),
   ),
        unitPrice: parseFloat(item.unitPrice),
      })),
   unitPrice),
      })),
    });
  };

  return (
    <divunitPrice),
      })),
    });
  };

  return (
    <div });
  };

  return (
    <div className="sales-quotation-form });
  };

  return (
    <div className="sales-quotation-form">
      <h3 className="sales-quotation-form">
      <h3>{initialData ? className="sales-quotation-form">
      <h3">
      <h3>{initialData ? 'Edit>{initialData ? 'Edit Sales Qu 'Edit Sales Quotation' : '>{initialData ? 'Edit Sales Qu Sales Quotation' : 'Buat Sales Quotation' : 'Buat Sales QuBuat Sales Quotation Baru'otation' : 'Buat Sales Quotation Baru'}</h3otation Baru'}</h3otation Baru'}</h3}</h3>
      <form onSubmit={handleSubmit>
      <form onSubmit={handleSubmit}>
        <div className>
      <form onSubmit={handleSubmit>
      <form onSubmit={handleSubmit}>
        <}>
        <div className="form-grid="form-grid">
          <div className}>
        <div className="form-grid">
          <div classNamediv className="form-grid">
          <div className">
          <div className="form-group="form-group">
            <label>="form-group">
            <label>="form-group">
            <label>">
            <label>PelangganPelanggan <span className="required">*</spanPelanggan <span className="requiredPelanggan <span className="required">*</span></label>
            <span className="required">*</span></label></label>
            <select
             ">*</span></label>
            <select
              name="customerId"
              value={>
            <select
              name="customerId name="customerId"
              value={ <select
              name="customerId"
              value={formData.customerId}
              onChange"
              value={formData.customerformData.customerId}
              onChangeformData.customerId}
              onChange={handleChange}
              className={errorsId}
              onChange={handleChange={handleChange}
              className={errors.customerId ?={handleChange}
              className={errors.customerId ? 'error' :.customerId ? 'error' : ''}
           }
              className={errors.customerId ? 'error' : ''}
            >
              < 'error' : ''}
            ''}
            >
              <option value="">Pilih >
              <option value="">Pilih Peloption value >
              <option value="">Pilih Pel Pelanggan</option>
              {customanggan</option>
              {custom="">Pilih Pelanggan</optionanggan</option>
              {customers.map(cers.map(c => (
                <optioners.map(c => (
                <option>
              {customers.map(c => (
                <option key={c.id => (
                <option key={c.id key={c.id} value={c key={c.id} value={c.id} value={c.id}>{c.name} value={c.id}>{c.name.id}>{c.name}</option>
              ))}
            </select}>{c.name}</option>
              ))}
            </select}</option>
              ))}
            </select>
           }</option>
              ))}
            </select>
            {errors.customerId &&>
            {errors.customerId && {errors.customerId && <span className=">
            {errors.customerId && <span className=" <span className="error-text">{errors <span className="error-text">{errorserror-text">{errors.customerId}</error-text">{errors.customerId}</.customerId}</span>}
         .customerId}</span>}
         span>}
         span>}
          </div>

          <div className="form-group">
            </div>

          <div className="form-group">
            </div>

          <div className=" </div>

          <div className="form-group">
            <label>Tang <label>Tanggal Quotation</ <label>Tanggal Quotation</form-group">
            <label>Tanggal Quotation</label>
           gal Quotation</label>
           label>
            <input
              type="date"
             label>
            <input
              type="date"
              <input
              type="date"
              name="qu <input
              type="date"
              name="quotation name="quotationDate"
              value name="quotationDate"
              value={formData.quotationDateotationDate"
              value={formData.Date"
              value={formData.={formData.quotationDate}
              onChange={handleChange}
           quotationDate}
              onChange={handlequotationDate}
              onChange={handleChange}
            />
          </div>

         }
              onChange={handleChange}
            />
          </div>

          <div className="formChange}
            />
          </div <div className />
          </div>

          <div className="form-group">
            <label>Berlaku H>

          <div className="form-group">
            <label>Berlaku Hingga="form-group">
            <label>Berlaku Hingga <span-group">
            <label>Berlaku Hingga <span className="required"> <span className="required">*</span></ className="required">*</span></ingga <span className="required">*</span></label>
           label>
            <input
              typelabel>
            <input
              type="date"
*</span></label>
            <input
              type="date"
              name <input
              type="date"
             ="date"
              name="validUntil              name="validUntil"
              value={="validUntil"
              value={formData.valid name="validUntil"
              value={formData.valid"
              value={formData.validformData.validUntil}
              onChangeUntil}
              onChange={handleChangeUntil}
              onChange={handleChangeUntil}
              onChange={handleChange}
             ={handleChange}
              className={errors}
              className={errors.validUntil ?}
              className={errors.validUntil ? className={errors.validUntil ? 'error' :.validUntil ? 'error' : 'error' : ''}
            'error' : ''}
            ''}
            />
            {errors. ''}
            />
            {errors.validUntil && />
            {errors.validUntil && <span className="error />
            {errors.validUntil &&validUntil && <span className="error <span className="error-text">{errors.-text">{errors.validUntil}</span <span className="error-text">{errors.validUntil}</span-text">{errors.validUntil}</spanvalidUntil}</span>}
          </>}
          </div>
        </>}
          </div>
        </>}
          </div>
        </div>
        </div>

       div>

        <div className="itemsdiv>

        <div className="itemsdiv>

        <div className="items-section <div className="items-section">
          <label>Item Qu-section">
          <label>Item Quotation <span className-section">
          <label>Item Quotation <span className">
          <label>Item Quotation <span classNameotation <span className="required">*="required">*</="required">*</="required">*</span></label>
          {formData.items.map((</span></label>
          {formspan></label>
          {formData.items.map((item, index) => (
           span></label>
          {formData.items.map((item, index) => (
           item, index) => (
           Data.items.map((item, index) => (
            <div key={index} className="item <div key={index} className="item <div key={index} className="item-row">
 <div key={index} className="item-row">
             -row">
              <select
                value-row">
              <select
                value={item.productId              <select
                value={item.productId <select
                value={item.productId={item.productId}
                onChange={(}
                onChange={(e) => handle}
                onChange={(e) => handle}
                onChange={(e) => handleItemChange(index, 'productId',e) => handleItemChange(index,ItemChange(index, 'productId',ItemChange(index, 'productId', e.target.value)}
                className={errors.items 'productId', e.target.value e.target.value)}
                className={errors e.target.value)}
                className={errors ? 'error' : ''}
              >
               )}
                className={errors.items ? 'error' : ''.items ? 'error' : ''.items ? 'error' : ''}
              >
                <option value="">Pilih Produk</}
              >
                <option value="">P}
              >
                <option value="">Pilih Produk <option value="">Pilih Produk</option>
                {products.map(p =>ilih Produk</option>
                {</option>
                {products.map(p =>option>
                {products.map(p => (
                  <option key={p.id (
                  <option key={p.idproducts.map(p => (
                  <option (
                  <option key={p.id} value={p.id}>{p.name} value={p.id}>{p.name key={p.id} value={p.id}>{p.name} ({p.sku})</} value={p.id}>{p.name} ({p.sku})</option} ({p.sku})</option>
                ))}
} ({p.sku})</option>
option>
                ))}
              </select>
             >
                ))}
              </select>
              <input
              </select>
              <input
                               ))}
              </select>
              <input
                <input
                type="number                type="number"
                min="1 type="number"
                min="1 type="number"
                min="1"
                min="1"
                value={"
                value={item.quantity"
                value={item.quantity"
                value={item.quantityitem.quantity}
                onChange={(e) => handleItem}
                onChange={(e) => handleItem}
                onChange={(e) => handleItemChange(index, '}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(eChange(index, 'quantity', parseInt(e.targetquantity', parseInt(e.target.value) ||Change(index, 'quantity', parseInt(e.target.target.value) || 0)}
               .value) || 0)}
                placeholder="Qty 0)}
                placeholder="Qty.value) || 0)}
                placeholder="Qty"
              />
              <input
                placeholder="Qty"
              />
             "
              />
              <input
               "
              />
              <input
                type="number"
                min="0 <input
                type="number"
                min="0 type="number"
                min="0"
                step="1000"
                type="number"
                min="0"
                step="1000"
                value={item."
                step="1000"
               "
                step="1000"
                value={item.unitPrice}
                value={item.unitPrice}
               unitPrice}
                onChange={(e) value={item.unitPrice}
                onChange={(e) => handleItemChange onChange={(e) => handleItemChange(index, 'unit => handleItemChange(index, 'unit onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value)(index, 'unitPrice', parseFloat(e.targetPrice', parseFloat(e.target.value)Price', parseFloat(e.target.value) || 0)}
                placeholder="H.value) || 0)}
                placeholder="H || 0)}
                placeholder="H || 0)}
                placeholder="Harga Satuanarga Satuan"
              />
             arga Satuan"
              />
             arga Satuan"
              />
             "
              />
              <button type="button" onClick={() => removeItem(index)} <button type="button" onClick={() => <button type="button" onClick={() => removeItem(index)} className="btn- <button type="button" onClick={() => removeItem(index)} className="btn-remove">✕ className="btn-remove">✕ removeItem(index)} className="btn-remove">✕</button>
            </div>
         remove">✕</button>
            </div>
         </button>
            </div>
         </button>
            </div>
          ))}
          <button type="button" ))}
          <button type="button" ))}
          <button type="button" onClick={addItem} className="btn ))}
          <button type="button" onClick={addItem} className="btn-add-item">+ onClick={addItem} className="btn onClick={addItem} className="btn-add-item">+ Tambah Item</ Tambah Item</button>
          {-add-item">+ Tambah Item</button>
          {errors.items && <span className="error-add-item">+ Tambah Item</button>
          {errors.items && <span className="errorbutton>
          {errors.items && <span className="errorerrors.items && <span className="error-text">{errors.items}</span>-text">{errors.items}</span>-text">{errors.items}</span>}
        </div>

        <div className-text">{errors.items}</span>}
        </div}
        </div>

        <div className}
        </div>

        <div className="form-grid">
          <div className>

        <div className="form-grid">
          <div className="form-group="form-grid">
          <div className="form-group="form-grid">
          <div className="form-group">
            <label>Diskon (%)="form-group">
            <label>Diskon">
            <label>Diskon (%)</">
            <label>Diskon (%)</</label>
            <input
              type (%)</label>
            <input
              typelabel>
            <input
              type="number"
             label>
            <input
              type="number"
              name="discount="number"
              name="discount="number"
              name="discount name="discount"
              min=""
              min="0"
              max="100"
"
              min="0"
              max"
              min="0"
              max0"
              max="100"
                           value={formData.discount}
             ="100"
              value={formData.discount}
             ="100"
              value={formData.discount}
              value={formData.discount}
              onChange={handleChange}
              className={ onChange={handleChange}
              className={ onChange={handleChange}
              className={ onChange={handleChange}
              className={errors.discount ?errors.discount ? 'error' :errors.discount ? 'error' :errors.discount ? 'error' : ''}
            />
            {errors.d 'error' : ''}
            ''}
            />
            {errors.d ''}
            />
            {errors.discount && <span className="error-text />
            {errors.discount && <span className="error-text">{errors.discountiscount && <span className="error-text">{errors.discountiscount && <span className="error-text">{errors.discount}</span>}
          </div">{errors.discount}</span>}
}</span>}
          </div}</span>}
          </div>
          <div className="form-group>
          <div className="form-group          </div>
          <div className="form-group>
          <div className="form-group">
            <label>">
            <label>Pajak (%)">
            <label>Pajak (%)">
            <label>Pajak (%)</label>
            <input
             Pajak (%)</label>
            <input
              type="number</label>
            <input
              type="number</label>
            <input
              type="number"
              name="tax"
              min=" type="number"
              name="tax"
              name="tax"
              min=""
              name="tax"
              min="0"
              max="100"
             0"
              max="100"
             "
              min="0"
              max="100"
              value={formData.tax}
             0"
              max="100"
              value={formData.tax}
              onChange={handleChange value={formData.tax}
              value={formData.tax}
              onChange={handleChange}
              className={ onChange={handleChange}
              className={}
              className={errors.tax ? onChange={handleChange}
              className={errors.tax ? 'error' : ''}
           errors.tax ? 'error' : ''}
           errors.tax ? 'error' : ''}
            />
            {errors.tax && <span 'error' : ''}
            />
            {errors.tax && <span />
            {errors.tax && <span className="error-text">{errors.tax />
            {errors.tax && <span className="error-text">{errors.tax}</span> className="error-text">{errors.tax className="error-text">{errors.tax}</span>}
          </div}
          </div>
        </div}</span>}
          </div>
        </div>

        <div className}</span>}
          </div>
        </div>

        <div className>
        </div>

        <div className>

        <div className="form-group="form-group">
          <label>="form-group">
          <label>Catatan</label="form-group">
          <label>">
          <label>Catatan</labelCatatan</label>
          <textarea
            name="Catatan</label>
          <textarea
            name="notes"
            rows>
          <textarea
            name="notes"
           notes"
            rows="2"
           >
          <textarea
            name="notes"
            rows="2"
           ="2"
            value={formData rows="2"
            value={formData value={formData.notes}
            value={formData.notes}
           .notes}
            onChange={handleChange.notes}
            onChange={handleChange onChange={handleChange}
            placeholder=" onChange={handleChange}
            placeholder="}
            placeholder="Catatan tambahan}
            placeholder="Catatan tambahan"
          />
        </div>

       Catatan tambahan"
          />
       Catatan tambahan"
          />
        </div>

       "
          />
        </div>

        <div className="total-display </div>

        <div className="total-display <div className=" <div className="total-display">
          Total: {">
          Total: {new Intl.total-display">
          Total: {">
          Total: {new Intl.NumberFormat('id-ID', {NumberFormat('id-ID', { stylenew Intl.NumberFormat('idnew Intl.NumberFormat('id-ID', { style style: 'currency', currency: 'ID: 'currency', currency: 'ID-ID', { style: 'currency', currency: 'IDR' }).format(calculate: 'currency', currency: 'IDR' }).formatR' }).format(calculateTotal())R' }).format(calculateTotal())}
Total())(calculateTotal())}
        </div}
        </div>

        <div        </div>

        <div className}
        </div>

        <div>

        <div className="form- className="form-actions">
          <button="form-actions">
          <button type className="form-actions">
          <button type="button" onClick={onactions">
          <button type="button type="button" onClick={onCancel} className="="button" onClick={onCancel} className="Cancel} className="btn-cancel">Batal</button" onClick={onCancel} className="btn-cancel">Batal</button>
          <buttonbtn-cancel">Batal</buttonbtn-cancel">Batal</button>
          <button type="submit" type="submit" disabled={isLoading>
          <button type="submit">
          <button type="submit" disabled={isLoading} className="btn} className="btn-submit">
            disabled={isLoading} className="btn disabled={isLoading} className="btn-submit">
            {isLoading ? {isLoading ? 'Menyimpan-submit">
            {isLoading ? 'Menyimpan-submit">
            {isLoading ? 'Menyimpan...' : initialData ? 'Per 'Menyimpan...' : initialData...' : initialData ? 'Per...' : initialData ? 'Perbarui' : 'Simpanbarui' : 'Simpan ? 'Perbarui' : 'Simpanbarui' : 'Simpan'}
          </button'}
          </button>
        </div'}
          </button>
        </div'}
          </button>
        </div>
      </form>

      <style>{>
        </div>
      </form>
      </form>

      <style>{>
      </form>

      <style>{`
        .sales-quotation-form>

      <style>{`
        .sales-quotation-form {
          background: #`
        .sales-quotation-form`
        .sales-quotation-form {
          background: # {
          background: #fff;
          borderfff;
          border-radius: 12px;
          padding {
          background: #fff;
          border-radius: 12px;
          padding: 1.fff;
          border-radius: 12px;
          padding: 1.-radius: 12px;
          padding: : 1.5rem;
         5rem;
          box-shadow: 5rem;
          box-shadow: 0 2px 8px rgba1.5rem;
          box-shadow: 0 2px 8px rgba box-shadow: 0 2px 8px rgba(0,0,0,0.06);
         0 2px 8px rgba(0,0,0,0.(0,0,0,0.06);
          max-width: 800px;
         (0,0,0,0.06);
          max-width: 800px;
          max-width: 800px;
          margin: 0 auto;
        }
        .sales-qu06);
          max-width: 800px;
          margin: 0 auto;
        margin: 0 auto;
        }
        .sales-quotation-form h3 { margin: 0 0  margin: 0 auto;
        }
        .sales-quotation-form h3 { margin: 0 0 otation-form h3 { margin: 0 0 1.5rem }
        .sales-quotation-form h3 { margin: 0 0 1.5rem 0; color1.5rem 0; color: #1f2937; }
        .form 0; color: #1f1.5rem 0; color: #1f2937; }
        .form-grid: #1f2937; }
        .form-grid-grid {
          display: grid;
          grid2937; }
        .form-grid {
          display: grid;
          grid-template-columns: {
          display: grid;
          grid {
          display: grid;
          grid-template-columns: 1fr -template-columns: 1fr  1fr 1fr;
         -template-columns: 1fr 1fr;
          gap: 11fr;
          gap: 11fr;
          gap: 1 gap: 1rem;
          marginrem;
          marginrem;
          marginrem;
          margin-bottom: 1rem;
       -bottom: 1rem;
        }
        .form-group {
          display:-bottom: 1rem;
        }
        .form-group {
          display-bottom: 1rem;
        }
        .form-group {
          display: }
        .form-group {
          display: flex;
          flex-direction: column: flex;
          flex-direction: column flex;
          flex-direction: column;
          gap: 0.25rem flex;
          flex-direction: column;
          gap: 0.25rem;
        }
       ;
          gap: 0.25rem;
          gap: 0.25rem;
        }
        .form-group label { font .form-group label { font-weight:;
        }
        .form-group label;
        }
        .form-group label { font-weight: 500; font-size:-weight: 500; font-size: 0 500; font-size: 0.9rem; { font-weight: 500; font-size: 0 0.9rem; color: #374.9rem; color: #374 color: #374151; }
       .9rem; color: #374151; }
        .required { color151; }
        .required { color151; }
        .required { color .required { color: #ef444: #ef4444; }
       : #ef4444; }
        .form-group input, .form-group: #ef4444; }
        .form-group input, .form-group select,4; }
        .form-group input .form-group input, .form-group select, . select, .form-group textarea .form-group textarea {
          padding: , .form-group select, .form-group textarea {
          padding: 0.form-group textarea {
          padding:  {
          padding: 0.0.6rem 0.75rem0.6rem 06rem 0.75rem;
          border: 1px6rem 0.75rem;
          border: 1px;
          border: 1px solid #d1.75rem;
          border: 1px solid #d1 solid #d1d5db solid #d1d5dbd5db;
          border-radius:d5db;
          border-radius: 8px;
          border-radius: 8px;
          border-radius: 8px;
          8px;
          font-size:;
          font-size: 0.95;
          font-size: 0.95 font-size: 0.95rem;
          background 0.95rem;
          background: #f9fafb;
        }
        .rem;
          background: #f9fafbrem;
          background: #f9fafb;
        }
        .form-group input:: #f9fafb;
        }
        .form-group input:;
        }
        .form-group input:form-group input:focus, .formfocus, .form-group select:focusfocus, .form-group select:focusfocus, .form-group select:focus-group select:focus, .form-group, .form-group textarea:focus, .form-group textarea:focus {
         , .form-group textarea:focus {
          outline: 2px solid textarea:focus {
          outline: 2px solid #3b82f6 {
          outline: 2px solid outline: 2px solid #3b82 #3b82f6;
          border;
          border-color: transparent;
        }
        #3b82f6;
          border-color: transparent;
        }
        .f6;
          border-color: transparent;
        }
        .form-group input-color: transparent;
        }
        .form-group input .form-group input.error, .formform-group input.error, .form-group select.error {.error, .form-group select.error { border-color: #.error, .form-group select.error {-group select.error { border-color: # border-color: #ef4444;ef4444; background: #f border-color: #ef4444; background: #fef2f2ef4444; background: #fef2f2 background: #fef2f2; }
        .error-text { coloref2f2; }
        .error-text { color: #ef444; }
        .error-text { color: #ef444; }
        .error-text { color: #ef4444; font-size: #ef4444; font-size4; font-size: 0.4; font-size: 0.: 0.8rem; }
        .items-section: 0.8rem; }
        .items-section {
          margin: 1rem 8rem; }
        .items-section {
          margin:8rem; }
        .items-section {
          margin: 1rem 0;
          padding {
          margin: 1rem 0;
          padding: 1rem 1rem 0;
          padding: 1rem;
          background:0;
          padding: 1rem;
          background: #f9f;
          background: #f9fafb;
         : 1rem;
          background: #f9fafb;
          #f9fafb;
         afb;
          border-radius: 8 border-radius: 8px;
        border-radius: 8px;
        }
        .items border-radius: 8px;
        }
        .items-section label { font-weight:px;
        }
        .items-section label { font }
        .items-section label { font-section label { font-weight: 500 500; display: block; margin-bottom:-weight: 500; display: block-weight: 500; display: block; margin-bottom: 0.5; display: block; margin-bottom: 0.5rem; }
       ; margin-bottom: 0.5rem; }
        .item-rowrem; }
        .item-row {
          display: flex 0.5rem; }
        .item-row {
          display: flex;
          gap: .item-row {
          display: flex {
          display: flex;
          gap: 0.5;
          gap: 0.5 0.5rem;
          align;
          gap: 0.5rem;
          align-items: center;
          margin-bottom:rem;
          align-items: centerrem;
          align-items: center;
          margin-bottom: 0.5-items: center;
          margin-bottom: 0.5rem;
          flex;
          margin-bottom: 0.5rem;
          flex-wrap: wrap 0.5rem;
          flex-wrap: wrap-wrap: wrap;
        }
        .rem;
          flex-wrap: wrap;
        }
        .item-row select {;
        }
        .item-row select { flex:;
        }
        .item-row select { flex: 2; min-width:item-row select { flex: 2 flex: 2; min-width: 2; min-width: 120px; 120px; }
        .item; min-width: 120px; }
        .item-row input { flex: 1; 120px; }
        .item-row input { flex: 1; min-width:  }
        .item-row input { flex-row input { flex: 1; min-width: 80px;80px; }
        .item-row: 1; min-width: 80px; }
        .item-row min-width: 80px; }
        .item-row input, .item-row select {
          }
        .item-row input, .item input, .item-row select {
          input, .item-row select {
          padding: 0.4rem -row select {
          padding: 0.4rem 0.6rem;
          border: padding: 0.4rem 0.6rem;
          border: 1px solid padding: 0.4rem 0.6rem;
          border: 1px solid0.6rem;
          border: 1px solid 1px solid #d1d #d1d5db;
          #d1d5db;
          #d1d5db;
         5db;
          border-radius: 6px;
          background: #fff;
        }
        border-radius: 6px;
          background: #fff;
        }
        border-radius: 6px;
          background: #fff;
        }
        .btn-remove border-radius: 6px;
          background: #fff;
        }
        .btn-remove .btn-remove {
          background: .btn-remove {
          background: #fee2 {
          background: #fee2e {
          background: #fee2e #fee2e2;
          border: none;
          border-radius: e2;
          border: none;
          border-radius: 6px;
         2;
          border: none;
          border-radius: 6px;
         2;
          border: none;
          border-radius: 6px;
         6px;
          padding: 0 padding: 0.2rem  padding: 0.2rem  padding: 0.2rem 0.6rem.2rem 0.6rem;
          cursor:0.6rem;
          cursor: pointer;
          color: #991b1b;
         0.6rem;
          cursor: pointer;
          color: #991b1b;
         ;
          cursor: pointer;
          color: #991b1b;
          pointer;
          color: #991b1b;
          font-weight: bold font-weight: bold;
        }
        font-weight: bold;
        }
        font-weight: bold;
        }
        .btn-add-item {
          background: #dbeafe;
        }
        .btn-add-item {
          background: #dbeafe;
          border: .btn-add-item {
          background: #dbeafe;
          border: .btn-add-item {
          background: #dbeafe;
          border: none;
          border-radius;
          border: none;
          border none;
          border-radius: 6 none;
          border-radius: 6px;
          padding: 6px;
          padding: 0.-radius: 6px;
          padding: 0.px;
          padding: 0.: 0.4rem 1rem;
          cursor: pointer;
         4rem 1rem;
          cursor4rem 1rem;
          cursor4rem 1rem;
          cursor: pointer;
          color: #1 color: #1e40af: pointer;
          color: #1e40af;
          font-weight:: pointer;
          color: #1e40af;
          font-weight: 500;
          margin-top: e40af;
          font-weight: 500;
          margin-top: 0.5rem;
          font-weight: 500;
          500;
          margin-top: 0.5rem;
        }
        .total-dis;
        }
        .total-display margin-top: 0.5rem;
        }
        .total-display {
          font-size0.5rem;
        }
        .total-display {
          font-size: 1.play {
          font-size: 1. {
          font-size: 1.25rem;
         : 1.25rem;
         25rem;
          font-weight: 25rem;
          font-weight:  font-weight: 700;
          text-align: right;
          margin:  font-weight: 700;
          text-align: right;
          margin: 1rem 700;
          text-align: right;
         700;
          text-align: right;
          margin: 1rem 0;
          color: #0;
          color: #111827 margin: 1rem 0;
          color: #111827;
        }
        .1rem 0;
          color: #111827;
        }
        .111827;
        }
        .form-actions {
          display: flex;
          justify-content;
        }
        .form-actionsform-actions {
          display: flex;
          justify-content: flex-endform-actions {
          display: flex: flex-end;
          gap:  {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          gap: 0.75rem;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top0.75rem;
          padding-top;
          padding-top: 1rem;
          padding-top: 1rem;
          border-top: 1rem;
          border-top: 1px solid #f3: 1rem;
          border-top: 1px solid #f3f4f;
          border-top: 1px solid #f3f4f6: 1px solid #f3f4f6;
        }
       f4f6;
        }
        .btn-cancel6;
        }
        .btn-cancel, .btn-submit {
          padding;
        }
        .btn-cancel, .btn-submit {
          padding: 0. .btn-cancel, .btn-submit {
          padding: 0.6rem 1, .btn-submit {
          padding: 0.6rem 1: 0.6rem 1.5rem6rem 1.5rem.5rem;
          border-radius:.5rem;
          border-radius:;
          border-radius: 8px;
          font-weight: 600;
         ;
          border-radius: 8px;
          font-weight: 600;
          8px;
          font-weight: 600;
          border: none 8px;
          font-weight: 600;
          border: none;
          cursor: border: none;
          cursor: pointer border: none;
          cursor: pointer;
          cursor: pointer;
          font-size pointer;
          font-size: 0.;
          font-size: 0.9rem;
          transition: all 0.2s;
          font-size: 0.9rem;
          transition: all 0.2s: 0.9rem;
          transition: all 0.2s;
        }
       9rem;
          transition: all 0.2s;
        }
       ;
        }
        .btn-cancel;
        }
        .btn-cancel .btn-cancel { background: #f3f4 .btn-cancel { background: #f3f4f6; color: #4b { background: #f3f4f6; color: #4b { background: #f3f4f6; color: #4bf6; color: #4b5563; }
        .btn-c5563; }
        .btn-c5563; }
        .btn-c5563; }
        .btn-cancel:hover { backgroundancel:hover { backgroundancel:hover { background: #e5e7ancel:hover { background: #e5e7eb; }
        .btn-submit { background: #e5e7eb; }
        .btn: #e5e7eb; }
        .btn-submit { background: #3b82f6;eb; }
        .btn-submit { background: #3b82f6;: #3b82f6; color: #fff; }
        .-submit { background: #3b82f6; color: #fff; }
        . color: #fff; }
        . color: #fff; }
        .btn-submit:hover:not(:disabledbtn-submit:hover:not(:disabledbtn-submit:hover:not(:disabled) { background: #2563ebbtn-submit:hover:not(:disabled) { background: #2563eb) { background: #2563eb; }
       ) { background: #2563eb; }
       ; }
        .btn-submit:; }
        .btn-submit:disabled { opacity: 0.6; cursor: .btn-submit:disabled { opacity: 0.6; cursor: not .btn-submit:disabled { opacity: 0.6; cursor: notdisabled { opacity: 0.6; cursor: not-allowed; }
        @media ( not-allowed; }
        @media (-allowed; }
        @media (-allowed; }
        @media (max-width: 640px)max-width: 640px)max-width: 640px)max-width: 640px) {
          .form-grid { grid-template-columns: 1 {
          .form-grid { grid-template-columns: 1 {
          .form-grid { grid-template-columns: 1fr; }
          . {
          .form-grid { grid-template-columns: 1fr; }
          .item-row {fr; }
          .item-row {fr; }
          .item-row { flex-direction: column; align-items:item-row { flex-direction: column; align-items: flex-direction: column; align-items: flex-direction: column; align-items: stretch; }
        }
      `}</style stretch; }
        }
      `}</style stretch; }
        }
      `}</style>
    </div>
  stretch; }
        }
      `}</style>
    </div>
  );
};

export default Sales>
    </div>
  );
};

export default>
    </div>
  );
};

export default SalesQuotationForm;