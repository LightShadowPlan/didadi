var express = require('express');
var router = express.Router();
var managementController = require('../controllers/management/index')

// 抽离响应头的设置 中间件zz 
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/loginByToken', managementController.loginByToken)
router.post('/loginByInfo', managementController.loginByInfo)
router.post('/addAccount', managementController.addAccount)
router.get('/selectAccount', managementController.selectAccount)
router.put('/updateAccount', managementController.updateAccount)
router.delete('/removeAccount', managementController.removeAccount)
router.post('/removeAccount', managementController.addMenu)
router.get('/removeAccount', managementController.selectMenu)
router.put('/removeAccount', managementController.updateMenu)
router.delete('/removeAccount', managementController.removeMenu)

module.exports = router;
