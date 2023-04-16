const redis = require('redis');
const {redis: {host, port, username, password}} = require('./config')

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

module.exports = client;