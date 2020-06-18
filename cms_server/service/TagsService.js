const tagsDao = require("../dao/tagsDao");
addTags = (nameList, success) => {
  tagsDao.addTags(nameList, success);
};
searchTagsIdWithName = (name, success) => {
  tagsDao.searchTagsIdWithName(name, success);
};
addChildrenTags = (list, pid, success) => {
  tagsDao.addChildrenTags(list, pid, success);
};
searchTagsNameIsTrue = (name, success) => {
  tagsDao.searchTagsNameIsTrue(name, success);
};
searchChildrenTagsNameIsTrue= (name, success) => {
    tagsDao.searchChildrenTagsNameIsTrue(name, success);
  };
module.exports = {
  addChildrenTags: addChildrenTags,
  searchTagsIdWithName: searchTagsIdWithName,
  addTags: addTags,
  searchTagsNameIsTrue: searchTagsNameIsTrue,
  searchChildrenTagsNameIsTrue:searchChildrenTagsNameIsTrue
};
