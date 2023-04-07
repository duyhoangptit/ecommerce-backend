// khởi động network của nodejs
require('dotenv').config()
const nodeEnv = process.env.NODE_ENV;

// config dotenv by environment
require('dotenv').config({
    path: `.env.${nodeEnv}`
})

console.log(process.env.PORT)
const PORT = process.env.PORT || 3055;

const app = require('./src/app');
const server =  app.listen(PORT, () => {
    console.log(`eCommerce start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close('Exit server express');
    // notify send (ping....)
});