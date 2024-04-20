const sequelize = require('../db/conn')

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Like = require('../models/Like')
const Follower = require('../models/Follower')



sequelize.sync({force: true}).then(() => {
    console.log('Tables Created')
}).catch(err => {
    console.log('Error To Sync Tables', err)
})