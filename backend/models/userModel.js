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
    }
})

sequelize.sync( { alter: true }).then( () => {
    console.log(colors.green('User table created successfully!'))
}).catch( (err) => {
    console.error(colors.red('Unable to create table : '), err)
})


module.exports = {
    User,
}