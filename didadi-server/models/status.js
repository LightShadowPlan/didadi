
const { mongoose } = require('../util')
const Moment = require('moment')


//管理静态资源数据库
let StatusModel = mongoose.model('status', new mongoose.Schema({
  statusName: String,
  statusUlr: String,
  addTime: Date,
  formatTime: String
}));


/**
 * 添加静态资源
 */
const addStatus = async (body) => {
  let _timestamp = Date.now()
  let moment = Moment(_timestamp)
  return AccountModel({
    ...body,
    addTime: _timestamp,
    formatTime: moment.format("YYYY-MM-DD  hh:mm")
  }).save(
  
  ).then((data) => {
    return data
  }).catch(() => {
    return false
  })
}
/**
 * 查询静态资源
 */
const selectStatus = async (body) => {
  return AccountModel.find(
    body
  ).then((res) => {
    return res
  }).catch(() => {
    return false
  })
}

/**
 * 删除静态资源
 */
const removeStatus = async (body) => {
  return AccountModel.deleteOne(
    body
  ).then((res) => {
    return res
  }).catch(() => {
    return false
  })
}


module.exports = {
    addStatus,
  selectStatus,
  removeStatus,
}