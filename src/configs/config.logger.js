const { createLogger, transports, format } = require('winston')
const {logger: {serviceName}} = require('./config')


// format log
const formatLog = format.combine(
    format.label({label: `${serviceName}`}),
    format.json(),
    format.timestamp(), // timestamp log
    format.metadata()
    // format.prettyPrint(), // format log
)

// config file log rotate
require('winston-daily-rotate-file')
const transport = new transports.DailyRotateFile({
    filename: `./logs/${serviceName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: formatLog
});

transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
});

// config save log to mongodb
/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb');

const {db: {host, name, port, username, password}} = require('./config')
const connectString = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`;
const configLogMongoDB = new transports.MongoDB({
    level : "error",
    db : connectString,
    options:{
        ignoreUndefined: true,
        useUnifiedTopology: true
    },
    collection : "app-logs"
})

const logger = createLogger({
    transports: [
        // ghi ra file trong truong hop log it
        // new transports.File({
        //     level: 'info',
        //     filename: './logs/app.info.log'
        // }),
        // new transports.File({
        //     level: 'warn',
        //     filename: './logs/app.warn.log'
        // }),
        transport,
        // save log into database
        configLogMongoDB
    ],
    format: formatLog
})

// check add log console
if (process.env.NODE_ENV !== 'productions') {
    logger.add(new transports.Console({
        format: formatLog
    }))
}

module.exports = {
    logger
}
