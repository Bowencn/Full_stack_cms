const adminDao = require('../dao/adminDao');
// queryAllStudent=(sucess)=>{
//     studentDao.queryAllStudent(sucess)
// }
// queryStudentByClassAndAge=(classNum,age)=>{
//     studentDao.queryStudentByClassAndAge(classNum,age)
// }
queryAdminLoginInfo=(name,success)=>{
    adminDao.queryAdminLoginInfo(name,success)
}
queryAdminInfo=(success)=>{
    adminDao.queryAdminInfo(success)
}
addAdminInfo=(name, jurisdiction, pwd,success)=>{
    adminDao.addAdminInfo(name, jurisdiction, pwd,success)
}
updateAdminInfo=(name, jurisdiction, pwd, success)=>{
    adminDao.updateAdminInfo(name, jurisdiction, pwd, success)
}
deleteAdminInfo=(name,success)=>{
    adminDao.deleteAdminInfo(name,success)
}
queryAdminNumber=(success)=>{
    adminDao.queryAdminNumber(success)
}
module.exports = {
    "queryAdminLoginInfo":queryAdminLoginInfo,
    "queryAdminNumber":queryAdminNumber,
    "queryAdminInfo":queryAdminInfo,
    "addAdminInfo":addAdminInfo,
    "updateAdminInfo":updateAdminInfo,
    "deleteAdminInfo":deleteAdminInfo
}