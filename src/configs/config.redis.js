const redis = require('redis');

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;

const client = redis.createClient({
    port: PORT,
    host: HOST
});

client.on('connect', () => {
    console.log(`Redis connected host ${HOST} port ${PORT}!`)
});

module.exports = client;