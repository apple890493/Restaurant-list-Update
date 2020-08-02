const Restaurant = require('../info')
const restaurantData = require('../../restaurant.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (i = 1; i <= restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('Restaurant create done')
})
