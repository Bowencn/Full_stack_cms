const bannerDao = require("../dao/bannerDao");
addBannerInfo = (dataList, success) => {
  bannerDao.addBannerInfo(dataList, success);
};
deleteBannerInfo = (serial_number, success) => {
  bannerDao.deleteBannerInfo(serial_number, success);
};
updateBannerInfo = (
  serial_number,
  name,
  image_url_info,
  tags,
  last_serial_number,
  success
) => {
  bannerDao.updateBannerInfo(
    serial_number,
    name,
    image_url_info,
    tags,
    last_serial_number,
    success
  );
};
searchBannerInfo = (success) => {
  bannerDao.searchBannerInfo(success);
};
module.exports = {
  addBannerInfo: addBannerInfo,
  deleteBannerInfo: deleteBannerInfo,
  searchBannerInfo: searchBannerInfo,
  updateBannerInfo: updateBannerInfo,
};
