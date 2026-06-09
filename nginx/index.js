const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Proxy pass ok!"
  })
})

app.get('/login', (req, res) => {
  res.status(200).json({
    message: "login is here!"
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})