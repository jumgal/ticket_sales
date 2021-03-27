import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require('mongoose')
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "abcdefg"
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})


afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close()
})

global.signin = () => {
    // const email = 'test@test.com'
    // const password = 'password'

    // const response = await request(app)
    // .post('/api/users/signup')
    // .send({
    //     email,
    //     password
    // })
    // .expect(201)

    // const cookie = response.get('Set-Cookie')

    // return cookie;

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    }

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Build session object
    const session = { jwt: token }


    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it bas base64
    const base64 = Buffer.from(sessionJSON).toString('base64')


    return [`express:sess=${base64}`]

}