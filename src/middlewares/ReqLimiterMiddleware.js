const rateLimit = require('express-rate-limit')

exports.reqLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Request Limits Excedeed, Try Again In One Minute'
}) 