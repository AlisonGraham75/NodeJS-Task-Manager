const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose= require('mongoose')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
}

const tokenString = 'Bearer ' + userOne.tokens[0].token

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

afterEach(() => {
    console.log('afterEach')
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Alison',
        email: 'alison.graham@email.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email:userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'Bob@bob.com',
        password: 'MyPass777!'
    }).expect(400)
})

test('Should get profile for user', async () => {
    
    await request(app)
        .get('/users/me')
        .set('Authorization', tokenString)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('users/me')
    .send()
    .expect(404)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(500)
})


test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', tokenString)
    .send()
    .expect(200)
})

