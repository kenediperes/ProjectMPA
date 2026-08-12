import React, { useState } from 'react';

const TaskAssignment = ({
  serviceOrder,
  availableEmployees,
  assignedTasks = [],
  onAssignTask,
  onUpdateTaskStatus,
  onClose,
  isLoading
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [editingTaskId, setEditingTaskId] = useState(null);

  if (!serviceOrder) {
    return <div className="error-message">Pesanan layanan tidak ditemukan.</div>;
  }

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedEmployee || !taskDescription.trim()) {
      alert('Pilih karyawan dan isi deskripsi tugas.');
      return;
    }
    onAssignTask({
      serviceOrderId: serviceOrder.id,
      employeeId: selectedEmployee,
      description: taskDescription,
      priority: taskPriority,
    });
    setTaskDescription('');
    setSelectedEmployee('');
    setTaskPriority('medium');
  };

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTaskStatus(taskId, newStatus);
  };

  const getStatusColor = (status) => {
    const map = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return map[status] || '#6b7280';
  };

  return (
    <div className="task-assignment-container">
      <div className="task-header">
        <h3>Penugasan Tugas - {serviceOrder.orderNumber}</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <div className="order-summary">
        <span><strong>Pelanggan:</strong> {serviceOrder.customer?.name || '-'}</span>
        <span><strong>Judul:</strong> {serviceOrder.title}</span>
        <span><strong>Status:</strong> {serviceOrder.status}</span>
      </div>

      <div className="task-list">
        <h4>Daftar Tugas</h4>
        {assignedTasks.length === 0 ? (
          <p className="no-tasks">Belum ada tugas yang ditugaskan.</p>
        ) : (
          <ul className="task-items">
            {assignedTasks.map(task => (
              <li key={task.id} className="task-item">
                <div className="task-detail">
                  <span className="task-description">{task.description}</span>
                  <span className="task-employee">👤 {task.employee?.name || 'Tidak diketahui'}</span>
                  <span className="task-priority" style={{ backgroundColor: getStatusColor(task.priority) }}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-actions">
                  <select
                    value={task.status || 'pending'}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => { /* edit task description */ }} className="btn-edit-task">✏️</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleAssign} className="assign-form">
        <h4>Tambahkan Tugas Baru</h4>
        <div className="form-group">
          <label>Karyawan / Teknisi <span className="required">*</span></label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">Pilih Karyawan</option>
            {availableEmployees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name} ({emp.role || 'Staff'})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Deskripsi Tugas <span className="required">*</span></label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Misal: Perbaiki mesin AC"
            required
          />
        </div>
        <div className="form-group">
          <label>Prioritas</label>
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className="btn-assign-submit">
          {isLoading ? 'Menugaskan...' : 'Tugaskan Tugas'}
        </button>
      </form>

      <style>{`
        .task-assignment-container {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .task-header h3 { margin: 0; color: #1f2937; }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0 0.5rem;
        }
        .close-btn:hover { color: #1f2937; }
        .order-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .task-list h4, .assign-form h4 {
          margin: 0.75rem 0 0.5rem 0;
          color: #374151;
        }
        .no-tasks {
          color: #9ca3af;
          font-style: italic;
        }
        .task-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.8rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .task-item:last-child { border-bottom: none; }
        .task-detail {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          align-items: center;
        }
        .task-description { font-weight: 500; }
        .task-employee { color: #4b5563; font-size: 0.9rem; }
        .task-priority {
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #fff;
        }
        .task-actions {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }
        .status-select {
          padding: 0.2rem 0.4rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.8rem;
          background: #f9fafb;
        }
        .btn-edit-task {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        .assign-form {
          margin-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }
        .assign-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .assign-form .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: #374151;
        }
        .assign-form .form-group input, .assign-form .form-group select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #f9fafb;
        }
        .assign-form .form-group input:focus, .assign-form .form-group select:focus {
          outline: 2px solid #3b82f6;
          border-color: transparent;
        }
        .required { color: #ef4444; }
        .btn-assign-submit {
          background: #8b5cf6;
          color: #fff;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
          width: 100%;
          margin-top: 0.5rem;
        }
        .btn-assign-submit:hover:not(:disabled) {
          background: #7c3aed;
        }
        .btn-assign-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error-message {
          padding: 1rem;
          color: #ef4444;
          background: #fef2f2;
          border-radius: 8px;
          text-align: center;
        }
        @media (max-width: 480px) {
          .task-item {
            flex-direction: column;
            align-items: stretch;
          }
          .task-actions {
            justify-content: flex-end;
            margin-top: 0.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskAssignment;