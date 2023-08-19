const express = require('express')
const { createMessageChannel } = require('./broker/messageChannel')

const app = express()

const delay = ms => new Promise(res => setTimeout(res, ms))

app.get('/producer', async (request, response) => {
  try {
    const user = {
      id: 1,
      name: 'teste'
    }

    const messageChannel = await createMessageChannel()
    if (messageChannel) {
      const json = JSON.stringify(user)
      messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(json))

      await messageChannel.close()
    }

    return response.json({
      msg: 'ok'
    })
  } catch (err) {
    return response.status(500).send(err)
  }
})

app.listen(3000, async () => {
  await delay(5000)
  console.log('app is running on port 3000')
})