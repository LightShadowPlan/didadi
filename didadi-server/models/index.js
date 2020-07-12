
const { mongoose } = require('../util')
const Moment = require('moment')
const fs = require('fs')
const Path = require('path')
const defaultNickname = '时光之外的往事'
const defaultHeadPortrait = ''
Moment.locale('zh-cn'); 

//账号数据库
let AccountModel = mongoose.model('accounts', new mongoose.Schema({
  account: String,
  password: String,
  nickname: String,
  headPortrait: String,
  authority: Number,
  state: Boolean,
  addTime: Date,
  formatTime: String
}));


/**
 * 添加账号
 */
const addAccount = async (body) => {
  let _timestamp = Date.now()
  let moment = Moment(_timestamp)
  let result = AccountModel({
    ...body,
    nickname: defaultNickname,
    authority: 3,
    headPortrait: defaultHeadPortrait,
    addTime: _timestamp,
    formatTime: moment.format("YYYY-MM-DD hh:mm:ss")
  }).save(
  
  ).then((data) => {
    return data
  }).catch(() => {
    return false
  })
  return result
}

/**
 * 查询账号 / 多条记录
 */
const selectAccount = async (body) => {
  let result = AccountModel.find(
    body,
    {
      'password': false 
    }
  ).then((res) => {
    return res
  }).catch(() => {
    return false
  })
  return result
}
/**
 * 查询账号 / 登录
 */
const loginByInfo = async (body) => {
  let result = AccountModel.find(
    {account: body.account, password: body.password},
    {password: 0}
  ).then((res) => {
    if(res && res.length > 0) {
      return res[0]
    } else {
      return false
    }
  }).catch(() => {
    return false
  })
  return result
}

/**
 *更新账号
 */
const updateAccount = async (body) => {
  let result = AccountModel.updateOne(
    {
      _id: body._id
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
const removeAccount = async (body) => {
  let result = AccountModel.deleteOne(
    body
  ).then((res) => {
    return res
  }).catch(() => {
    return false
  })
  return result
}


module.exports = {
  addAccount,
  selectAccount,
  loginByInfo,
  updateAccount,
  removeAccount,
}