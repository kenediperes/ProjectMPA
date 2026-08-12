// backend/src/models/QualityControl.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QualityControl = sequelize.define('QualityControl', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'work_orders',
        key: 'id',
      },
    },
    inspectedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    inspectionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    result: {
      type: DataTypes.ENUM('pending', 'passed', 'failed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reworkCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'quality_controls',
  });

  QualityControl.associate = (models) => {
    QualityControl.belongsTo(models.WorkOrder, { foreignKey: 'workOrderId' });
    QualityControl.belongsTo(models.User, { foreignKey: 'inspectedBy', as: 'inspector' });
  };

  return QualityControl;
};