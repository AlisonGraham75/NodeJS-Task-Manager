const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const authentication = require('../middleware/authentication')
const router = new express.Router()

/*
** CRUD operations Create Read Update Delete
*/

//CREATE
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const authToken = await user.generateAuthToken()
        res.status(201).send({user, authToken})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const authToken = await user.generateAuthToken()
      
        res.send( {user, authToken})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/user/logout', authentication, async (req, res) => {
    try {
  
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/user/logoutAll', authentication, async (req, res) => {
    try {
  
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//READ
//Run 'authentication' middleware method first
router.get('/users/me', authentication, async (req, res) =>  {
    //user was put in the req in authentication method after it was authenticated.
    res.send(req.user)
})

//READ 
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
   
})
//UPDATE
router.patch('/users/me', authentication, async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    //every method runs the callback function onces for every item in an array
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {

       updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()
        res.send(req.user)
    }catch (e) {
        res.status(400).send(e)
    }
})
//DELETE
router.delete('/users/me', authentication, async (req, res) => {
    try {
        await req.user.remove()
        return res.send(req.user)
    } catch (e) {
        res.status(500).send
    }
})

//UPLOAD
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', authentication, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {  /** an express callback method to better handle errors. */
    res.status(400).send({ error:error.message}) /* without this, it displays html with errors in the response body */
})

module.exports = router
