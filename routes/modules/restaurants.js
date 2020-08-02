const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/info')

// 引用restaurant模組程式碼

// Search method
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(restaurant => {
      if (restaurant.length !== 0)
        res.render('index', { restaurant, keyword })
      else res.render('no', { keyword: keyword })
    })
    .catch(error => console.log(error))
})

// Creat method
router.get('/new', (req, res) => {
  return res.render('new')
})

// Detail method
router.get('/:id', (req, res) => {
  const storeId = req.params.id
  return Restaurant.findById(storeId)
    .lean()
    .then((store) => res.render('show', { store }))
    .catch(error => console.log(error))
})

// Edit method
router.get('/:id/edit', (req, res) => {
  const storeId = req.params.id
  return Restaurant.findById(storeId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//POST method
router.post('/', (req, res) => {
  const data = req.body
  if (!data.image.length) {
    data.image = 'https://i.imgur.com/kXNxrm9.jpg'
  } else {
    data.image
  }

  const restaurant = new Restaurant(data)
  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const storeId = req.params.id
  console.log(storeId) //test
  const newEdit = req.body
  Restaurant.findById(storeId)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, newEdit)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${storeId}/edit`))
    .catch(error => res.redirect(`/restaurants/${storeId}/edit`))
})

router.delete('/:id', (req, res) => {
  const storeId = req.params.id
  return Restaurant.findById(storeId)
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

