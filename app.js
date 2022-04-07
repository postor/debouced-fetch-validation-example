const express = require('express')
const app = express()
const port = 3001

app.use('/', express.static('dist'))

app.get('/apis/account-exists', (req, res) => {
  if (req.query.account == 'test')
    return setTimeout(() => res.json({ exists: true }), 10000)
  res.json({ exists: false })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})