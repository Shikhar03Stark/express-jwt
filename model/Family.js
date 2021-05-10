const {DataTypes, Model} = require('sequelize')
const instance = require('../config/db');
const User = require('./User')

class Family extends Model{};

Family.init({
    rid : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user1 : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        }
    },
    user2 : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
        }
    }
}, {
    sequelize: instance,
    modelName: 'Family',
});

Family.sync();

module.exports = instance.models.Family;