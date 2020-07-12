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
    console.log('req: ',req)
    console.log('req.headers: ',req.headers)
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
		handleData(req, res, 300)
		return false;
	}

}

// 登录 - token
const loginByToken = async (req, res) => {
	let userInfo = checkToken(req, res)
	if (!userInfo) return false
	handleData(req, res, 200, userInfo)
}
// 登录 - 账号密码
const loginByInfo = async (req, res) => {
	let body = req.body
	body.password = hash(Base64.decode(body.password))
	let userInfo = await indexModels.loginByInfo(body)
	if (userInfo) {
		handleData(req, res, 200, userInfo)
	} else {
		handleData(req, res, 405)
	}


}


module.exports = {
	loginByInfo,
	loginByToken,
}