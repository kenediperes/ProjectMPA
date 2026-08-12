// backend/src/models/WorkOrder.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WorkOrder = sequelize.define('WorkOrder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workOrderNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    finishedProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantityToProduce: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('planned', 'in-progress', 'completed', 'cancelled'),
      defaultValue: 'planned',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'work_orders',
  });

  WorkOrder.associate = (models) => {
    WorkOrder.belongsTo(models.Product, { foreignKey: 'finishedProductId', as: 'finishedProduct' });
    WorkOrder.belongsToMany(models.Product, {
      through: 'WorkOrderMaterial',
      foreignKey: 'workOrderId',
      otherKey: 'productId',
      as: 'materials',
    });
    WorkOrder.hasOne(models.QualityControl, { foreignKey: 'workOrderId' });
  };

  return WorkOrder;
};