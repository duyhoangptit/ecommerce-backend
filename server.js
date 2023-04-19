require('dotenv').config()
const nodeEnv = process.env.NODE_ENV;

// config dotenv by environment
require('dotenv').config({
    path: `.env.${nodeEnv}`
})

console.log('ENV:::', nodeEnv, ' PORT:::', process.env.PORT)
const PORT = process.env.PORT || 3055;

// start server nodejs
const app = require('./src/app');
const server =  app.listen(PORT, () => {
    console.log(`${process.env.SERVICE_NAME} start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close('Exit server express');
    // notify send (ping....)
});