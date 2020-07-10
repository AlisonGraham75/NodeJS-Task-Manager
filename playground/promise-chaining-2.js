require('../src/db/mongoose')

const Task = require('../src/models/task')

//Demonstrate promise chaining.  
//First get and update a user, then get a count of all users with age 1
Task.findByIdAndRemove('5f077aee76bb5718453dcf94').then((task) => {
    console.log(task)
    return Task.countDocuments({completed:false}) 
}).then ((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

