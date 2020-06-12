const appreciateDao = require('../dao/appreciateDao');
addAppreciateInfo=(name,imgName,imgUrl, success)=>{
    appreciateDao.addAppreciateInfo(name,imgName,imgUrl, success)
}
deleteAppreciateInfo=(success)=>{
    appreciateDao.deleteAppreciateInfo(success)
}
searchAppreciateInfo=(success)=>{
    appreciateDao.searchAppreciateInfo(success)
}
module.exports = {
    "addAppreciateInfo":addAppreciateInfo,
    "deleteAppreciateInfo":deleteAppreciateInfo,
    "searchAppreciateInfo":searchAppreciateInfo
}