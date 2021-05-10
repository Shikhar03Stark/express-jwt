const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');

class User extends Model{}

User.init({
    uid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name : {
        type: DataTypes.STRING,
        defaultValue: 'Anonymous',
        allowNull: true,
    }
}, {
    instance,
    modelName: 'User'
});

User.sync();

module.exports = instance.models.User;


