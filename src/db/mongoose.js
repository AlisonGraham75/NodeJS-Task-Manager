const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
} )

/*
** Model for Users
*/  
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

/*
** Model for Tasks
*/  

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

//Test Users Model
// const me = new User({
//     name: 'Alison',
//     age: 45
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
    completed: false
})

//promise method calls
task.save().then(() => {
    console.log(task)

}).catch((error) => {
    console.log('Error!', error)
})