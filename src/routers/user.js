const express = require('express')
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
router.patch('/users/:id', async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    //every method runs the callback function onces for every item in an array
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(400).send(e)
    }
})
//DELETE
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (e) {
        res.status(500).send
    }
})

module.exports = router
