const { Sequelize } = require('sequelize')
require('dotenv').config()

const environment = process.env.NODE_ENV
const {
    name_database, user_database, password_database, host, dialect
} = require(`../config/config.dev.json`)


const sequelize = new Sequelize(name_database, 
    user_database, password_database, { host, dialect })

module.exports = sequelize