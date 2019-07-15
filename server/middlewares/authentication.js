const verifyToken = require('../helpers/verifyToken')
const User = require('../models/users.js')

module.exports = (req,res, next) => {
  if(req.headers.hasOwnProperty('token')) {
    try {
      const decoded = verifyToken(req.headers.token);
      User.findOne({ email: decoded.email })
        .then(users => {
          if(users) {
            req.loggedUser = decoded;
            next()
          } else {
            next({ status: 403, message: 'Authentication failed' })
          }
        })
        .catch(next)
    } catch(err) {
      next({status: 400, message: 'you must login first'})
    }
  } else {
    next({status: 400, message: 'you must login first'})
  } 
}