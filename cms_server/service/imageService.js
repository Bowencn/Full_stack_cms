const imageDao = require('../dao/imageDao');
addImageInfo=(originalname, destination, filename, success)=>{
    imageDao.addImageInfo(originalname, destination, filename, success)
}
queryImageInfo=(success)=>{
    imageDao.queryImageInfo(success)
}
deleteImageInfo=(filename,success)=>{
    imageDao.deleteImageInfo(filename,success)
}
queryAImageInfo=(filename,success)=>{
    imageDao.queryAImageInfo(filename,success)
}
module.exports = {
    "addImageInfo":addImageInfo,
    "queryImageInfo":queryImageInfo,
    "deleteImageInfo":deleteImageInfo,
    "queryAImageInfo":queryAImageInfo
}