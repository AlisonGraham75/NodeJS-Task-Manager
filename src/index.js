const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//Automatically parse incoming JSON to an object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const password = 'Red12345!'
    const hashPassword = await bcrypt.hash(password, 8) //8 is # of rounds of hashing

    console.log(password)
    console.log(hashPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashPassword)
    console.log(isMatch)
}

myFunction()