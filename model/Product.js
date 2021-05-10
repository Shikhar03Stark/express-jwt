const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');

class Product extends Model{}

Product.init({
    pid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: true,
    }, 
    price : {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.0
    }
}, {
    instance,
    modelName: 'Product'
});

Product.sync();

module.exports = instance.models.Product;


