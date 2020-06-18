const tagsDao = require('../dao/tagsDao');
addTags=(nameList,success)=>{
    tagsDao.addTags(nameList,success)
}
searchTags=(name,success)=>{
    tagsDao.searchTags(name,success)
}
addChildrenTags = (list,pid,success)=>{
    tagsDao.addChildrenTags(list,pid,success)

}
module.exports = {
    "addChildrenTags":addChildrenTags,
    "searchTags":searchTags,
    "addTags":addTags,
}