const Sequalize = require('sequelize')

const sequalize = new Sequalize({
    dialect: 'sqlite',
    storage: '../data/database.sqlite'
});

sequalize.authenticate()
    .then(() => {
        console.log(`Connected to Local DB Successfully`);
    })
    .catch(err => {
        console.error(err);
    })

    
module.exports = sequalize