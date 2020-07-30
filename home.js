//引用Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/info')

// 首頁相關路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: '1' })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})



//匯出路由器
module.exports = router