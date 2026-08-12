const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServiceOrder = sequelize.define('ServiceOrder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    serviceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'service_orders',
  });

  ServiceOrder.associate = (models) => {
    ServiceOrder.belongsTo(models.Customer, { foreignKey: 'customerId' });
  };

  return ServiceOrder;
};