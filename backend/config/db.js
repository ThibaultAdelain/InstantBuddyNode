const { Sequelize } = require('sequelize')
const colors = require('colors')

const sequelize = new Sequelize(
    'INSTANT_BUDDY_DB',
    'root',
    'root1234',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)


sequelize.authenticate().then( () => {
    console.log(colors.cyan.underline(`Access granted: connected to the database.`));
}).catch( (error) => {
    console.error(colors.red.underline(`Access denied: can't reach connection to the database`), error);
})

module.exports = {
    sequelize,
}