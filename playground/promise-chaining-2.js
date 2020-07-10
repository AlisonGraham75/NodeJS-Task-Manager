require('../src/db/mongoose')

const Task = require('../src/models/task')

//Demonstrate promise chaining.  
//First get and delete a task, then get a count of all uncompleted tasks
// Task.findByIdAndRemove('5f077aee76bb5718453dcf94').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed:false}) 
// }).then ((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


//Demonstrate same as above using Async/Await
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}


deleteTaskAndCount('5f07969305d1ab9cd9420c9c').then((count) => {
    console.log(count)
}).catch ((e) => {
    console.log(e)
})