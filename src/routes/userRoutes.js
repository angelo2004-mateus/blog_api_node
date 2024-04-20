const express = require('express')
const router = express.Router()

const {
    createUser,
    loginUser,
    updateUser,
    getUserInfo,
    deleteUser
} = require('../controllers/UserController')

// MIDDLEWARES

const { reqLimiter } = require('../middlewares/ReqLimiterMiddleware')
const { checkToken } = require('../middlewares/CheckTokenMiddleware')

// ROUTES

router.get('/user/info', checkToken, getUserInfo)

router.post('/user/create', reqLimiter, createUser)

router.post('/user/login', reqLimiter, loginUser)

router.put('/user/update', checkToken, updateUser)

router.delete('/user/delete', checkToken, deleteUser) 



module.exports = router
