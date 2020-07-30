//引用Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sorts = require('./modules/sorts')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/sorts', sorts)

//匯出路由器
module.exports = router
