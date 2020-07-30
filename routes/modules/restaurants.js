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
        res.render('index', { restaurant: restaurant })
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

  const restaurant = new Restaurant({
    name: `${data.name}`,
    name_en: `${data.name_en}`,
    category: `${data.category}`,
    location: `${data.location}`,
    phone: `${data.phone}`,
    google_map: `${data.google_map}`,
    rating: `${data.rating}`,
    description: `${data.description}`,
    image: `${data.image}`,
  })
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
      for (let i in newEdit) {
        if (restaurant[i]) {
          restaurant[i] = newEdit[i]
          console.log(restaurant[i]) //test
        }
      }
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${storeId}/edit`))
    .catch(error => res.redirect(`/restaurants/${storeId}/edit`))
})

// app.put('/restaurants/:id', (req, res) => {
//   const storeId = req.params.id
//   const item = req.body
//   Restaurant.findById(storeId)
//     .then(restaurant => {
//       for (let i in restaurant) {
//         if (item[i] && typeof item[i] !== "function") {
//           restaurant[i] = item[i]
//         }
//         restaurant.save()
//       }
//     })
//     .then(() => res.redirect(`/restaurants/${storeId}/edit`), { dataError })
//     .catch(error => res.redirect(`/restaurants/${storeId}/edit`))
// })

router.delete('/:id', (req, res) => {
  const storeId = req.params.id
  return Restaurant.findById(storeId)
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
