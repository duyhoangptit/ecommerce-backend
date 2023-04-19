const redis = require('redis');
const {redis: {host, port, username, password}} = require('./config')

class RedisConf {
    constructor() {
        this.connect()
    }

    connect() {
        const client = redis.createClient({
            port: port,
            host: host
        });

        client.on('connect', () => {
            console.log(`Connected: Redis connected host ${host} port ${port}!`)
        });

        client.on('error', () => {
            console.log(`Error: Redis connected host ${host} port ${port}!`)
        });
    }

    static getInstance() {
        if (!RedisConf.instance) {
            RedisConf.instance = new RedisConf()
        }

        return RedisConf.instance
    }
}

const instanceRedis = RedisConf.getInstance();
module.exports = instanceRedis;