const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');
const util = require('../util/util');

class User extends Model{}

User.init({
    uid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name : {
        type: DataTypes.STRING,
        defaultValue: 'Anonymous',
        allowNull: true,
    }
}, {
    sequelize: instance,
    modelName: 'User'
});

User.beforeCreate(async (user, opts) => {
    const hashedPass = await util.hashPassword(user.password);
    user.password = await hashedPass;
});

User.sync();

module.exports = instance.models.User;


