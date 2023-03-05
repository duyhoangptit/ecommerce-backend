
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const SECONDS = 5000;

// count connect
const countConnect = () => {
    const numOfConnect = mongoose.connections.length;
    console.log(`Number of connections: ${numOfConnect}`);
}

// check over load connect
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUse = process.memoryUsage().rss;
        // server chiu dk 5 connect
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory usage:: ${memoryUse / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log(`Connection overload detected!`);
            // notify.send(....)
        }

    }, SECONDS);
}

module.exports = {
    countConnect,
    checkOverload
}