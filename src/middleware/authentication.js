const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticate = async (req, res, next) => {
    try  {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id:decoded._id, 'tokens.token':token})
        
        if (!user) {
            throw new Error()
        }

       //add user on to the request to use
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
    
} 

module.exports = authenticate