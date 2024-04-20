const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const User = require('./User')
const Post = require('./Post')

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    commentContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})

Comment.belongsTo(User, { foreignKey: 'authorId' })
User.hasMany(Comment, { foreignKey: 'authorId' })

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

module.exports = Comment