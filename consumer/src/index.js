const express = require('express')
const { consumer } = require('./broker/consumer')

const app = express()

const delay = ms => new Promise(res => setTimeout(res, ms))

app.listen(3001, async () => {
  await delay(5000)
  await consumer()
  console.log('app is running on port 3001')
})
