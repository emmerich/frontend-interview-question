const db = require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/price', (req, res) => res.json({ price: db.price(), timestamp: Date.now() }))

app.post('/purchase', (req, res) => {
  const amount_param = req.body.amount

  if(amount_param === undefined || amount_param === null) {
    return res.status(400).json({ message: 'Missing amount' })
  }

  const amount = parseFloat(amount_param, 10)

  if(Number.isNaN(amount)) {
    return res.status(400).json({ message: 'Amount must be a valid number' })
  }

  if(amount === 0) {
    return res.status(400).json({ message: 'Amount must not be 0' })
  }

  if(amount < 0) {
    return res.status(400).json({ message: 'Amount must be positive' })
  }

  if(amount > 1000) {
    return res.status(400).json({ message: 'Amount must be less than 1000' })
  }

  return res.json(db.purchase(amount))
})

app.get('/transactions', (req, res) => {
  const page_param = req.query.page

  if(page_param === undefined || page_param === null) {
    return res.status(400).json({ message: 'Missing page query' })
  }

  const page = parseInt(page_param, 10)

  if(Number.isNaN(page)) {
    return res.status(400).json({ message: 'Page must be a valid number' })
  }

  if(page <= 0) {
    return res.status(400).json({ message: 'Page must be greater than 0' })
  }

  const total_pages = db.numberOfPages()

  if(page > total_pages) {
    return res.status(404).json({ message: 'Page not found' })
  }

  const transactions = db.transactions(page)

  res.json({
    transactions,
    total: db.numberOfTransactions(),
    page,
    total_pages
  })
})

app.listen(8080, () => console.log('WuhaCoin server listening on http://localhost:8080'))
