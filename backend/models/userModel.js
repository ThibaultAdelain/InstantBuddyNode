const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../config/db")
const colors = require('colors')

const User = sequelize.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

sequelize.sync().then( () => {
    console.log(colors.green('User table created successfully!'))
}).catch( (err) => {
    console.error(colors.red('Unable to create table : '), err)
})


module.exports = {
    User,
}