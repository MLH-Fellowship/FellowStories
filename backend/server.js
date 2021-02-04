const express = require('express')
require('dotenv').config({})

const app = express()

app.get('/', (req, res) => {
  res.send('App running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`)
})
