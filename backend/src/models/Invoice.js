// backend/src/models/Invoice.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales_orders',
        key: 'id',
      },
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    paidAmount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid', 'overdue', 'cancelled'),
      defaultValue: 'unpaid',
    },
    paymentTerms: {
      type: DataTypes.ENUM('net15', 'net30', 'net60', 'cod'),
      defaultValue: 'net30',
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'invoices',
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.SalesOrder, { foreignKey: 'salesOrderId' });
  };

  return Invoice;
};