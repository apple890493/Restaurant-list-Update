//引用Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const Restaurant = require('../../models/info')

// 首頁相關路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const sortBy = req.query.by

  console.log('sortBy', sortBy)
  Restaurant.find()
    .lean()
    .sort({ sortBy: '-1' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router