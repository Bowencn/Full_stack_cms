const personalInformationDao = require("../dao/personalInformationDao");
addPersonalInfo = (name, autograph, user_image, success) => {
  personalInformationDao.addPersonalInfo(name, autograph, user_image, success);
};
deletePersonalInfo = (success) => {
  personalInformationDao.deletePersonalInfo(success);
};
searchPersonalInfo = (success) => {
  personalInformationDao.searchPersonalInfo(success);
};
module.exports = {
  addPersonalInfo: addPersonalInfo,
  searchPersonalInfo: searchPersonalInfo,
  deletePersonalInfo: deletePersonalInfo,
};
