// Khởi động network của nodejs
const app = require('./src/app');

const PORT = process.env.PORT || 3055;

const server =  app.listen(PORT, () => {
    console.log(`eCommerce start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close('Exit server express');
    // notify send (ping....)
});