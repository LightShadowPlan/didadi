const messages = require("../json/messages.json")
// req, res, code - 状态码, state - 传给前端的真实状态, data - 数据, message - 
const handleData = (req, res, code, data = null, message = null) => {
	let AcceptLanguage = req.headers['accept-language']
	let lang = AcceptLanguage ? AcceptLanguage.split(',')[0] : 'zh-CN'
	switch (code) {
		// 成功 200
		case 200: res.send({ code: 200,  data, message: message || messages[lang].success }); break;
		
		// 重定向 300 - login - 登录已过期
		case 300: res.send({ code: 300, data: null, message: message || messages[lang].redirectToLogin }); break;
		
		// 未经授权,访问被拒绝
		case 401: res.send({ code: 401,  data: null, message: message || messages[lang].noAuth }); break;

		// 禁止访问
		case 403: res.send({ code: 403, data: null, message: message || messages[lang].noAccess }); break;

		// 找不到资源
		case 404: res.send({ code: 404,  data: null, message: message || messages[lang].notFound }); break;

		// 405 - login - 账号或密码错误
		case 405: res.send({ code: 405,  data: null, message: message || messages[lang].accountOrPasswordError }); break;

		// 服务器错误 500
		case 500: res.send({ code: 500,  data: null, message: message || messages[lang].serverError }); break;

		// 请求出错
		default: res.send({ code: 400,  data: null, message: message || messages[lang].error }); break;
	}
}

module.exports = handleData