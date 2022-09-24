const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../config/db")
const colors = require('colors')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessionID: {
        type: DataTypes.INTEGER,
    }
})

sequelize.sync( { alter: true }).then( () => {
    console.log(colors.green('User table accessed successfully !'))
}).catch( (err) => {
    console.error(colors.red('Unable to access to the table : '), err)
})


module.exports = {
    User,
}