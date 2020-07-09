const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
} )

/*
** Model for Users
*/  
const User = mongoose.model('User', {
    name: {
        type: String,
        required:true ,      //Built in Mongoose validation
        trim:true
    },
    email: {
        type: String,
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
        minLength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password must not contain the phrase password")
            }
        }
    }
})

/*
** Model for Tasks
*/  

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

//Test Users Model
// const me = new User({
//      name: '     Alison    ',
//      email: 'alison@MYEMAIL.IO  ',
//      password: '123'
// })

// me.save().then(() => {
//     console.log(me)

// }).catch((error) => {
//     console.log('Error!', error)
// })

/*
** Test Tasks Model
*/
const task = new Task({
    description: 'Take out the trash',
    //completed: false
})

//promise method calls
task.save().then(() => {
    console.log(task)

}).catch((error) => {
    console.log('Error!', error)
})