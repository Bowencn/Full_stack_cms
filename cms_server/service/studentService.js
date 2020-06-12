const studentDao = require('../dao/studentDao');
// queryAllStudent=(sucess)=>{
//     studentDao.queryAllStudent(sucess)
// }
// queryStudentByClassAndAge=(classNum,age)=>{
//     studentDao.queryStudentByClassAndAge(classNum,age)
// }
// queryStudentByStuNum=(stuNum,success)=>{
//     studentDao.queryStudentByStuNum(stuNum,success)
// }
queryAdminInfo=(success)=>{
    studentDao.queryAdminInfo(success)
}
addAdminInfo=(name, jurisdiction, pwd,success)=>{
    studentDao.addAdminInfo(name, jurisdiction, pwd,success)
}
updateAdminInfo=(name, jurisdiction, pwd, success)=>{
    studentDao.updateAdminInfo(name, jurisdiction, pwd, success)
}
deleteAdminInfo=(name,success)=>{
    studentDao.deleteAdminInfo(name,success)
}
module.exports = {
    // "queryAllStudent":queryAllStudent,
    // "queryStudentByStuNum":queryStudentByStuNum,
    "queryAdminInfo":queryAdminInfo,
    "addAdminInfo":addAdminInfo,
    "updateAdminInfo":updateAdminInfo,
    "deleteAdminInfo":deleteAdminInfo
}