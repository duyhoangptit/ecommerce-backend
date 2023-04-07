const local = {
    app: {
        port: process.env.PORT
    },
    db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_DATABASE,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    }
}

const uat = {
    app: {
        port: process.env.PORT
    },
    db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_DATABASE,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    }
}

const config = {local, uat}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]