const express = require('express')
const Task = require('../models/task')
const authentication = require('../middleware/authentication')
const router = new express.Router()

/*
** CRUD operations Create Read Update Delete
*/
 

//CREATE
router.post('/tasks', authentication, async (req, res) => {
    //Add the user id on to the task object.
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//READ
//Get /tasks?completed=true
//Get /tasks?limit=10&skip=0
router.get('/tasks', authentication,  async (req, res) =>  {

    const match  = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//READ 
router.get('/tasks/:id', authentication, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
          res.status(500).send()
    }
   
})

//UPDATE
router.patch('/tasks/:id', authentication, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', authentication, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        return res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router