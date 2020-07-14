/*
** Model for Users
*/

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true ,      //Built in Mongoose validation
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {     //Use validator NPM package
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {       //custom validation
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password must not contain the phrase password")
            }
        }
    },
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }]

})

//method methods are accessible on the instances
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const authToken = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token:authToken})
    await user.save()
    return authToken
}

//Hide stuff that the user doesnt need to see in the response
userSchema.methods.toJSON = function() {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Static methods are accessible on the model
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    } 

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }
    
    return user
}


//Hash the plain text password before savings
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
