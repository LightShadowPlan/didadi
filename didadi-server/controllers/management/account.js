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


// 验证token有效性
const checkToken = async (req, res) => {
    let _token = ''
    if (req.headers.cookie && req.headers.cookie.length > 0 && req.headers.cookie.indexOf('token=') >= 0) {
        _token = req.headers.cookie.replace('token=', '')
    }
    if (_token) {
        result = token.checkToken(_token) // 获取token状态
        if (!result.state) { // token过期
            handleData(req, res, 400)
            return false;
        }
        let userInfo = await indexModels.selectAccount(result.data)
        return userInfo[0];
    } else {
        handleData(req, res, 400)
        return false;
    }
}
// 登录 - token
const loginByToken = async (req, res) => {
    let userInfo = await checkToken(req, res)
    if (!userInfo) return false
    handleData(req, res, 201, userInfo)
}
// 登录 - 账号密码
const loginByInfo = async (req, res) => {
    let body = req.body
    body.password = hash(Base64.decode(body.password))
    let userInfo = await indexModels.loginByInfo(body)
    if (userInfo) {
        let newToken = token.createToken({ account: userInfo.account })
        res.setHeader('Set-Cookie', 'token=' + newToken);
        handleData(req, res, 201, userInfo)
    } else {
        handleData(req, res, 400)
    }
}
// 新增用户
const addAccount = async (req, res) => {
    let userInfo = await checkToken(req, res)
    req.body.password = hash(Base64.decode(req.body.password))
    let newData = await indexModels.addAccount(req.body)
    handleData(req, res, 200, newData)
}
// 查找用户
const selectAccount = async (req, res) => {
    let userInfo = await checkToken(req, res)
    if (!userInfo) return false
    let newData = await indexModels.selectAccount(req.query)
    handleData(req, res, 200, newData)
}
// 更新用户
const updateAccount = async (req, res) => {
    let userInfo = await checkToken(req, res)
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
    loginByToken,
    loginByInfo,
    addAccount,
    selectAccount,
    updateAccount,
    removeAccount,
}