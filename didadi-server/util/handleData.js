const messages = require("../json/messages.json")
// req, res, code - 状态码, state - 传给前端的真实状态, data - 数据, message - 
const handleData = (req, res, code, data = null, message = null) => {
    let AcceptLanguage = req.headers['accept-language']
    let lang = AcceptLanguage ? AcceptLanguage.split(',')[0] : 'zh-CN'
    switch (code) {
        // 操作成功 200
        case 200: res.send({ code: 200, data, message: message || messages[lang].success }); break;

        // 登录成功 201
        case 201: res.send({ code: 201, data, message: message || messages[lang].success }); break;

        // 未经授权,访问被拒绝
        case 400: res.send({ code: 400, data: null, message: message || messages[lang].error }); break;

        // 服务器错误 500
        case 500: res.send({ code: 500, data: null, message: message || messages[lang].serverError }); break;

        // 请求出错
        default: res.send({ code: 500, data: null, message: message || messages[lang].serverError }); break;
    }
}

module.exports = handleData