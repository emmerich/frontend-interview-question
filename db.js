const uuid = require('uuid/v4')

const NUMBER_OF_TRANSACTIONS = 500
const PAGE_SIZE = 10

const getRandomPrice = () => Math.ceil(Math.random() * 10)
const generateID = () => uuid()

const updatePrice = timeout => setTimeout(() => {
  price = getRandomPrice()
  updatePrice(Math.random() * 10)
}, timeout)

const generateFakeTransactions = () => {
  for(let i = 0; i<NUMBER_OF_TRANSACTIONS; i++) {
    transactions = transactions.concat({
      id: generateID(),
      purchased: Math.ceil(Math.random() * 1000),
      price: getRandomPrice(),

      // Random date in the last year
      timestamp: Date.now() - (Math.ceil(Math.random() * (1000 * 60 * 60 * 24 * 365)))
    })
  }

  transactions.sort((a, b) => a.timestamp - b.timestamp)
}

const purchase = amount => {
  const transaction = {
    id: generateID(),
    purchased: amount,
    price,
    timestamp: Date.now()
  }

  transactions = transactions.concat(transaction)
  return transaction
}

let price = 0
let transactions = []

updatePrice(0)
generateFakeTransactions()

module.exports = {
  price: () => price,
  purchase,
  transactions: page => transactions.slice((page - 1) * 10, (page * 10)),
  numberOfTransactions: () => transactions.length,
  numberOfPages: () => Math.ceil(transactions.length / PAGE_SIZE)
}
