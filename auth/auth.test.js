// set up super test
const app = require('../api/server.js');
const supertest = require('supertest');
const request = supertest(app);

const Users = require('../users/users-model.js');
const db = require('../database/dbConfig.js');

describe('test environment', function() {
    it('should use testing environment', function(){
        expect(process.env.DB_ENV).toBe('testing');
    })
})

describe('add()', function(){
    //await before each test
    beforeEach(async () => {
        await db('users').truncate();
    })

   it('creates a new user to the db', async function(){
    await Users.add({username:'testuser', password:'testpassword'});

    const user = await db('users');

    expect(user).toHaveLength(1);



   })




})

describe('resisture', function () {
    it('creates a user', async function(){
        const payload = {
            "username":"user",
            "password":"password"
        }
        const res = await (await request.post('/api/auth/register').send(payload));
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('username');
    })
})
describe('login', function () {
    it('creates a user', async function(){
        const payload = {
            "username":"user",
            "password":"password"
        }
        const res = await (await request.post('/api/auth/login').send(payload));
        expect(res.body).toHaveProperty('token')
        expect(res.status).toBe(200);
        
    })
})