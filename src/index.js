const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//Express middleware method to stop route handler to do something first.
// app.use((req, res, next) => {
//    if(req.method === 'GET') {
//        res.send('Get requests are disabled')
//    } else {
//        next()
//    }
// })

//Express middleware method to stop route handling when site is in maintenance mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is down for maintenance')
// })

//Automatically parse incoming JSON to an object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
