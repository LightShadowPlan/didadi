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


// 验证token有效性及权限检查
const checkToken = (req, res) => {
    let userToken = req.headers.Authorization ? req.headers.Authorization : null
    let tokenState = {}
    if (userToken) {
        tokenState = token.checkToken(userToken.data) // 获取token状态
        if (!tokenState.state) { // token过期, 重定向到登录页
            handleData(req, res, 300)
            return false;
        }
        return tokenState.data;
    } else { // cookie 中不携带token, 重定向到登录页
        handleData(req, res, 201)
        return false;
    }

}
// 权限验证
const checkAuth = (data, needAuth) => {
    if (data && data.authority < needAuth) { // 权限不够
        handleData(req, res, 400, null, "权限不够")
        return false
    } else {
        return true;
    }
}
// 新增用户
const addAccount = async (req, res) => {
    let userInfo = checkToken(req, res)
    if (!checkAuth(userInfo, 1)) return false
    req.body.password = hash(Base64.decode(req.body.password))
    let newData = await indexModels.addAccount(req.body)
    handleData(req, res, 200, newData)
}
// 查找用户
const selectAccount = async (req, res) => {
    let userInfo = checkToken(req, res)
    if (!userInfo) return false
    let newData = await indexModels.selectAccount(req.query)
    handleData(req, res, 200, newData)
}
// 更新用户
const updateAccount = async (req, res) => {
    let userInfo = checkToken(req, res)
    if (!userInfo) return false
    let newData = await indexModels.updateAccount(req.body)
    handleData(req, res, 200, newData)
}
// 删除用户
const removeAccount = async (req, res) => {
    let userInfo = checkToken(req, res)
    if (!userInfo) return false
    let newData = await indexModels.removeAccount(req.body)
    handleData(req, res, 200, newData)
}



module.exports = {
    addAccount,
    selectAccount,
    updateAccount,
    removeAccount,
}