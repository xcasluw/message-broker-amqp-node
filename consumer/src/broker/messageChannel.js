require('dotenv/config')
const { connect } = require('amqplib')

const createMessageChannel = async () => {
  try {
    const connection = await connect(process.env.AMQP_SERVER)
    const channel = await connection.createChannel()
    await channel.assertQueue(process.env.QUEUE_NAME, { durable: true })
    console.log('Connected to RabbitMQ')

    channel.consume(
      process.env.QUEUE_NAME, (msg) => {
        if (msg !== null) {
          console.log('Received:', msg.content.toString())
          channel.ack(msg)
        }
      }
    )
    return channel
  } catch (err) {
    console.log('Error while trying to connect to RabbitMQ')
    console.log(err)
    return null
  }
}

module.exports = {
  createMessageChannel
}
