const sliderDao = require('../dao/sliderDao');
addSliderInfo=(title, comment,img_name,img_url, success)=>{
    sliderDao.addSliderInfo(title, comment,img_name,img_url, success)
}
// deletesliderInfo=(success)=>{
//     sliderDao.deletesliderInfo(success)
// }
// searchsliderInfo=(success)=>{
//     sliderDao.searchsliderInfo(success)
// }
module.exports = {
    "addSliderInfo":addSliderInfo,
    // "deletesliderInfo":deletesliderInfo,
    // "searchsliderInfo":searchsliderInfo
}