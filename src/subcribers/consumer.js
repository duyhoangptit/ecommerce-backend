const amqplib = require('amqplib')
const amqpUri = "amqp://guest:guest@localhost:5672";

const receiveQueue = async ({address}) => {
    try {
        // 1. create connect
        const conn = await amqplib.connect(amqpUri)

        // 2. create channel
        const channel = await conn.createChannel()

        // 3. create name queue
        const nameQueue = address
        await channel.assertQueue(nameQueue, {
            durable: false // neu false thi se mat du lieu khi server crash
        })

        // 5. send message
        await channel.consume(nameQueue, msg => {
            console.log(`Message::: ${msg.content.toString()}`)
        }, {
            noAck: true // xac dinh no chua nhan, default la false, can update true, danh dau da doc
        })

        // 6. close conn and channel
    } catch (error) {
        console.error(error)
    }
}

receiveQueue({address: 'send-otp-sms'})
