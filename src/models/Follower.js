const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require('./User');

const Follower = sequelize.define('Follower', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

Follower.belongsTo(User, { foreignKey: 'followerId' });
User.hasMany(Follower, { foreignKey: 'followerId' });

Follower.belongsTo(User, { foreignKey: 'followedId' });
User.hasMany(Follower, { foreignKey: 'followedId' });

module.exports = Follower;