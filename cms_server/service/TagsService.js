const tagsDao = require("../dao/tagsDao");
addTags = (nameList,herf, success) => {
  tagsDao.addTags(nameList,herf, success);
};
searchTagsIdWithName = (name, success) => {
  tagsDao.searchTagsIdWithName(name, success);
};
addChildrenTags = (name,herf, pid, success) => {
  tagsDao.addChildrenTags(name,herf, pid, success);
};
searchTagsNameIsTrue = (name, success) => {
  tagsDao.searchTagsNameIsTrue(name, success);
};
searchChildrenTagsNameIsTrue = (name, success) => {
  tagsDao.searchChildrenTagsNameIsTrue(name, success);
};
searchTags=(success)=>{
    tagsDao.searchTags(success)
}
searchChildrenTags=(success)=>{
    tagsDao.searchChildrenTags(success)
}
module.exports = {
  addChildrenTags: addChildrenTags,
  searchTagsIdWithName: searchTagsIdWithName,
  addTags: addTags,
  searchTags:searchTags,
  searchChildrenTags:searchChildrenTags,
  searchTagsNameIsTrue: searchTagsNameIsTrue,
  searchChildrenTagsNameIsTrue: searchChildrenTagsNameIsTrue,
};
