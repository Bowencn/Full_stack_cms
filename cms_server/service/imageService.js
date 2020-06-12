const imageDao = require('../dao/imageDao');
addImageInfo=(originalname, destination, filename, success)=>{
    imageDao.addImageInfo(originalname, destination, filename, success)
}
queryImageInfo=(success)=>{
    imageDao.queryImageInfo(success)
}
module.exports = {
    "addImageInfo":addImageInfo,
    "queryImageInfo":queryImageInfo
}