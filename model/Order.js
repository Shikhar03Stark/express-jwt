const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');
const User = require('./User')
const Product = require('./Product')

class Order extends Model{}

Order.init({
    oid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    uid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        }
    },
    pid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'pid',
        }
    }
}, {
    sequelize: instance,
    modelName: 'Order'
});

Order.sync();

module.exports = instance.models.Order;


