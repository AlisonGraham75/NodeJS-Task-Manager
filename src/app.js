/**
 *  This script defines our express application
 */
 
const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

//Automatically parse incoming JSON to an object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

module.exports = app