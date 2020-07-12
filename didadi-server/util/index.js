
const mongoose = require('./mongoose')
const handleData = require('./handleData')
const Base64 = require('./Base64')
const { token, hash } = require('./token')

module.exports = {
	handleData,
	Base64,
	hash,
	mongoose,
	token,
}
