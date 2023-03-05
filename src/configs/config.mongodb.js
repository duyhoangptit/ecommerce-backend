const dev = {
    app: {
        port: process.env.PORT
    },
    db: {
        host: "localhost",
        port: "27017",
        name: "shopDEV",
        username: "admin",
        password: "admin"
    }
}

const prod = {
    app: {
        port: process.env.PORT
    },
    db: {
        host: "localhost",
        port: "27017",
        name: "shopDEV",
        username: "admin",
        password: "admin"
    }
}

const config = {dev, prod}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]