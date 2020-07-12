var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index/index')

// 抽离响应头的设置 中间件zz 
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)
router.post('/loginByInfo', indexController.loginByInfo)
router.post('/loginByToken', indexController.loginByToken)

module.exports = router;
