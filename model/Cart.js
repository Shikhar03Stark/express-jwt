const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');
const User = require('./User')
const Product = require('./Product')

class Cart extends Model{}

Cart.init({
    cid : {
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
        },
        unique: 'compositeUniq',
    },
    pid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'pid',
        },
        unique: 'compositeUniq',
    }
}, {
    sequelize: instance,
    modelName: 'Cart',
});

Cart.sync();

module.exports = instance.models.Cart;


