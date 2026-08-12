const { Sequelize } = require('sequelize');
const config = require('./index');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    logging: config.env === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

const models = {
  User: require('../models/User')(sequelize),
  Customer: require('../models/Customer')(sequelize),
  Supplier: require('../models/Supplier')(sequelize),
  Product: require('../models/Product')(sequelize),
  SalesQuotation: require('../models/SalesQuotation')(sequelize),
  SalesOrder: require('../models/SalesOrder')(sequelize),
  SalesOrderItem: require('../models/SalesOrderItem')(sequelize),
  PurchaseRequest: require('../models/PurchaseRequest')(sequelize),
  PurchaseOrder: require('../models/PurchaseOrder')(sequelize),
  PurchaseOrderItem: require('../models/PurchaseOrderItem')(sequelize),
  ServiceOrder: require('../models/ServiceOrder')(sequelize),
  WorkOrder: require('../models/WorkOrder')(sequelize),
  WorkOrderTask: require('../models/WorkOrderTask')(sequelize),
  QualityControl: require('../models/QualityControl')(sequelize),
  Invoice: require('../models/Invoice')(sequelize),
  Notification: require('../models/Notification')(sequelize),
  InventoryTransaction: require('../models/InventoryTransaction')(sequelize),
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  models,
  testConnection,
};