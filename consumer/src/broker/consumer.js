const { createMessageChannel } = require("./messageChannel")

const consumer = async () => {
    const messageChannel = await createMessageChannel()
    return messageChannel
}

module.exports = {
    consumer
}
