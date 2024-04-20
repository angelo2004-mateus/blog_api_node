const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User')

exports.checkToken = async (req, res, next) => {

    const cookiesHeader = req.headers.cookie

    if(!cookiesHeader) return res.status(401).json({ msg: 'Unanuthorized. Cookie In Header Not Found.' })

    const cookies = cookiesHeader.split(';')

    let userToken

    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim()

        const [ cookieName, cookieValue ] = trimmedCookie.split('=')

        if(cookieName === 'userToken') {
            userToken = cookieValue
            
            try {
                const secret = process.env.SECRET
                const decodedToken = jwt.verify(userToken, secret)

                const user = await User.findOne({where: {id: decodedToken.id}})
                req.userData = user.dataValues
                next()

            } catch (err) {
                res.status(400).json({ msg: 'Invalid Or Expired Token' })
            }

            break
        }
    }

    if(!userToken) return res.status(401).json({ msg: 'Unanuthorized. Token User In Cookie Not Found.' })


}
