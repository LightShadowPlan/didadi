
const { mongoose } = require('../util')

//账号数据库
let MenuModel = mongoose.model('menus', new mongoose.Schema({
    name: String,
    code: String,
    sort: Number,
    isHide: Boolean,
}));


/**
 * 添加菜单
 */
const addMenu = async (body) => {
    let result = MenuModel({
        ...body
    }).save().then((data) => {
        return data
    }).catch(() => {
        return false
    })
    return result
}

/**
 * 查询菜单
 */
const selectMenu = async (query) => {
    let result = MenuModel.find(
        query
    ).then((res) => {
        return res
    }).catch(() => {
        return false
    })
    return result
}

/**
 *更新菜单
 */
const updateMenu = async (body) => {
    let result = MenuModel.updateOne(
        {
            code: body.code
        },
        body
    ).then((res) => {
        return res
    }).catch(() => {
        return false
    })
    return result
}

/**
 * 删除账号
 */
const removeMenu = async (body) => {
    let result = MenuModel.deleteOne(
        body
    ).then((res) => {
        return res
    }).catch(() => {
        return false
    })
    return result
}


module.exports = {
    addMenu,
    selectMenu,
    updateMenu,
    removeMenu,
}