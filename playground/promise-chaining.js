require('../src/db/mongoose')

const User = require('../src/models/user')

// //Demonstrate promise chaining.  
// //First get and update a user, then get a count of all users with age 1
// User.findByIdAndUpdate('5f0777f9098e4e19fcd45171', { age: 1}).then((user) =>{
//     console.log(user)
//     return User.countDocuments({ age:1 }) //Return the next promise
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


//Below is same funcationality as above only it uses async/await pattern
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5f0777f9098e4e19fcd45171', 2).then((count) => {
    console.log(count)
}).catch ((e) => {
    console.log(e)
})