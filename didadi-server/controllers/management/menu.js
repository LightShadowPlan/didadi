/**
 * info system
 */
const url = require('url')
const {
    handleData,
    token,
    hash,
    Base64
} = require('../../util/index')
const indexModels = require('../../models/index')


// 新增菜单
const addMenu = async (req, res) => {
    let newData = await indexModels.addMenu(req.body)
    handleData(req, res, 200, newData)
}
// 查找用户
const selectMenu = async (req, res) => {
    let newData = await indexModels.selectMenu(req.query)
    handleData(req, res, 200, newData)
}
// 更新用户
const updateMenu = async (req, res) => {
    let newData = await indexModels.updateMenu(req.body)
    handleData(req, res, 200, newData)
}
// 删除用户
const removeMenu = async (req, res) => {
    let newData = await indexModels.removeMenu(req.body)
    handleData(req, res, 200, newData)
}



module.exports = {
    addMenu,
    selectMenu,
    updateMenu,
    removeMenu,
}