const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require('./User');
const Post = require('./Post');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

Like.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Like, { foreignKey: 'userId' });

Like.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId' });

module.exports = Like;