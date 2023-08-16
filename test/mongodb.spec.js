const mongoose = require('mongoose')
const connectString = 'mongodb://admin:admin@localhost:27017/shopDEV?authSource=admin'

const TestSchema = new mongoose.Schema({name: String})
const Test = mongoose.model('Test', TestSchema)

describe('Mongoose Connection', () => {
    let connection;

    beforeAll(async() => {
        connection = await mongoose.connect(connectString)
    })

    afterAll(async() => {
        await connection.disconnect()
    })

    it ('should connect to mongoose', () => {
        expect(mongoose.connection.readyState).toBe(1)
    })

    it ('should save a document to the database', async() => {
        const user = new Test({name: 'tiger pro'})
        await user.save()
        expect(user.isNew).toBe(false)
    })

    it ('should find a document to the database', async() => {
        const user = await Test.findOne({name: 'tiger pro'})
        expect(user).toBeDefined()
        expect(user.name).toBe('tiger pro')
    })
})
