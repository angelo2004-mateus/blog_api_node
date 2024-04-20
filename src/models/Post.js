const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./User')

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    postContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    creationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

})

Post.belongsTo(User, { foreignKey: 'authorId' })
User.hasMany(Post, { foreignKey: 'authorId' })

module.exports = Post