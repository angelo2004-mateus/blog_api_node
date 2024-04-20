const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },

    name: {
        type: DataTypes.STRING,
        required: true,
    },

    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        required: true,
    },

    description: {
        type: DataTypes.TEXT,
    }
})

module.exports = User