const winston = require('winston');
/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb');

const { createLogger, transports, format } = require('winston')
const {db: {host, name, port, username, password}} = require('./config.mongodb')

const connectString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'info',
            filename: './logs/app.info.log'
        }),
        new transports.File({
            level: 'warn',
            filename: './logs/app.warn.log'
        }),
        new winston.transports.MongoDB({
            level : "info",
            db : connectString,
            options:{
                ignoreUndefined: true,
                useUnifiedTopology: true
            },
            collection : "app-logs"
        })
    ],
    // format: format.json()
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        // format.prettyPrint(),
    )
})

module.exports = {
    logger
}