require('dotenv/config')
const { connect } = require('amqplib')

const createMessageChannel = async () => {
  try {
    const connection = await connect(process.env.AMQP_SERVER)
    const channel = await connection.createChannel()
    await channel.assertQueue(process.env.QUEUE_NAME)
    console.log('Connected to RabbitMQ')
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
