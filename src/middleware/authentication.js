const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticate = async (req, res, next) => {
    try  {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id:decoded._id, 'tokens.token':token})
        
        if (!user) {
            throw new Error()
        }

        //make token available to other route handlers.
        req.token = token
        //add user on to the request to use
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
    
} 

module.exports = authenticate