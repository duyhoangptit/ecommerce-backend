const config = {
    app: {
        port: process.env.PORT,
        env: process.env.NODE_ENV
    },
    db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_DATABASE,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    },
    redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    },
    rabbitmq: {
        amqpUri: process.env.RABBIT_URI
    },
    openApi: {
        title: process.env.OPEN_API_TITLE,
        version: process.env.OPEN_API_VERSION,
        description: process.env.OPEN_API_DESCRIPTION
    },
    logger: {
        serviceName: process.env.SERVICE_NAME
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        email_from: process.env.EMAIL_FROM
    },
    s3: {
        bucket: process.env.BUCKET,
        region: process.env.REGION,
        aws_access_key: process.env.AWS_ACCESS_KEY,
        aws_secret_key: process.env.AWS_SECRET_KEY,
    },
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: process.env.LOCALE_DEFAULT,
        folderPath: ''
    }
}

module.exports = config