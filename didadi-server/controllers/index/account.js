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
    let userToken = req.headers.cookie || null
    let tokenState = {}
    if (userToken) {
        tokenState = token.checkToken(userToken.data) // 获取token状态
        if (!tokenState.state) { // token过期
            handleData(req, res, 400)
            return false;
        }
        let userInfo = await indexModels.loginByInfo(tokenState.data)
        return userInfo;
    } else {
        handleData(req, res, 400)
        return false;
    }
}
// 登录 - token
const loginByToken = async (req, res) => {
    let userInfo = await checkToken(req, res)
    if (!userInfo) return false
    handleData(req, res, 200, userInfo)
}
// 登录 - 账号密码
const loginByInfo = async (req, res) => {
    let body = req.body
    body.password = hash(Base64.decode(body.password))
    let userInfo = await indexModels.loginByInfo(body)
    if (userInfo) {
        let Authorization = token.createToken({ account: userInfo.account })
        res.setHeader('Set-Cookie', 'Authorization=' + Authorization);
        handleData(req, res, 200, userInfo)
    } else {
        handleData(req, res, 400)
    }
}
// 查找用户
const selectAccount = async (req, res) => {
    let userInfo = await checkToken(req, res)
    if (!userInfo) return false
    let newData = await indexModels.selectAccount(req.query)
    handleData(req, res, 200, newData)
}




module.exports = {
    loginByToken,
    loginByInfo,
    selectAccount,
}