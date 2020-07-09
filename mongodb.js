/**
 * CRUD OPERATIONS using MongoDB
 * CREATE, READ, UPDATE, DELETE 
 */


// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

//Destructure mongoDB object to acheive same as above
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client) => {
    if (error)  {
        return console.log('Unable to connect.')
    } 

    const db = client.db(databaseName)
    
/** 
 * CREATE operations
 */
    //Insert just one document to users collection
    // db.collection('users').insertOne({
    //     _id : id,
    //     name : 'Bob', 
    //     age : '22'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.')
    //     } 

    //     console.log(result.ops)
    // })

    //Insert many documents to users collection
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jane',
    //         age: '72'
    //     },
    //     {
    //         name: 'Luke',
    //         age: '37'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents.')
    //     }    
    //     console.log(result.ops)
    // })

    //Insert many documents to tasks collection
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Take out the trash',
    //         completed: 'true'
    //     },
    //     {
    //         description: 'Wash the car',
    //         completed: 'true'
    //     },
    //     {
    //         description: 'Sweep the floor',
    //         completed: 'false'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents.')
    //     }    
    //     console.log(result.ops)
    // })
 
 /**
 * READ operations
 */
    //Fetch one document - returns first one it finds with these criteria
    // db.collection('users').findOne({ name: 'Bob', age: 1}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     } 

    //     console.log(user)
    // })
    //search by id
    // db.collection('users').findOne({ _id: new ObjectID("5f0355ef531b2f83fccf2192")}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     } 

    //     console.log(user)
    // })

    //fetch all with the criteria. - returns a curser
    // db.collection('users').find({ age: 44 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // //fetch all with the criteria. - returns a curser
    // db.collection('users').find({ age: 44 }).count((error, count) => {
    //     console.log(count)
    // })

    // //Fetch one document - returns first one it finds with these criteria
    // db.collection('tasks').findOne({ _id: new ObjectID("5f035f4963173daa49001f8c")}, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     } 

    //     console.log(task)
    // })

    // //fetch all with the criteria. - returns a curser
    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
 
    /**
  * UPDATE Operations
  * 
  */
 
    // use promises pattern to UPDATE a document
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5f03585eed661f3686e44c7f")
    // }, {
    //     $set: {
    //         //name: 'Mike'
    //         age: 44

    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }) .catch((error) => {
    //     console.log(error)
    // })

    // use promises pattern to INCREMENT a document
    // const incrementPromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5f0355ef531b2f83fccf2192")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }) .catch((error) => {
    //     console.log(error)
    // })

     // use promises pattern to Update Many documents
//   db.collection('tasks').updateMany({
//         completed: 'false'
//     }, {
//         $set: {
//             completed: 'true'
//         }
//     }).then((result) => {
//         console.log(result.modifiedCount)
//     }).catch((error) => {
//         console.log(error)
//     })
    
/**
 * DELETE operations
 */

   db.collection('users').deleteMany({
       age: 44
   }).then((result) => {
       console.log(result.deletedCount)
   }).catch((error) => {
       console.log(error)
   })
    
   db.collection('tasks').deleteOne({
       description: 'Wash the car'
   }).then((result) => {
       console.log(result.deletedCount)
    }).catch((error) => {
       console.log(error)
    })
})