const dbutil = require("./dbutil");
let connection;
// function queryAllStudent(sucess) {
//   connection = dbutil.createConnection();
//   let querySql = "select * from student;";
//   connection.connect();
//   connection.query(querySql, (error, result) => {
//     if (error == null) {
//       // console.log(result);
//       sucess(result);
//     } else {
//       console.log(error);
//     }
//   });
//   connection.end();
// }
// function queryStudentByClassAndAge(classNum, age) {
//   connection = dbutil.createConnection();
//   let querySql = "select * from student where class = ? and age = ?;";
//   let queryParams = [classNum, age];
//   connection.connect();
//   connection.query(querySql, queryParams, (error, result) => {
//     if (error == null) {
//       console.log(result);
//     } else {
//       console.log(error);
//     }
//   });
//   connection.end();
// }
// function queryStudentByStuNum(stuNum, success) {
//   connection = dbutil.createConnection();
//   let querySql = "select * from student where stu_num = ? ;";
//   connection.connect();
//   connection.query(querySql, stuNum, (error, result) => {
//     if (error == null) {
//       console.log(result);
//       success(result);
//     } else {
//       console.log(error);
//     }
//     connection.end();
//   });
// }
function queryAdminLoginInfo(name,success) {
  connection = dbutil.createConnection();
  let querySql = "select id,name,jurisdiction,pwd from administrators where name=?;";
  connection.connect();
  let queryParams = [name];
  connection.query(querySql,queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    // connection.end();
  });
}
function queryAdminInfo(success) {
  connection = dbutil.createConnection();
  let querySql = "select id,name,jurisdiction from administrators;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}
function queryAdminNumber(success) {
  connection = dbutil.createConnection();
  let querySql = "select count(name) as userNum from administrators;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}
function addAdminInfo(name, jurisdiction, pwd, success) {
  connection = dbutil.createConnection();
  let querySql =
    "insert into administrators (name,jurisdiction,pwd) values (?,?,?);";
  connection.connect();
  let queryParams = [name, jurisdiction, pwd];
    connection.query(querySql, queryParams, (error, result) => {
      if (error == null) {
        success(result);
      } else {
        success('error',error.code)
        // console.log(1, error);
      }
      connection.end();
    });
}

function updateAdminInfo(name, jurisdiction, pwd, success) {
  connection = dbutil.createConnection();
  let querySql =
    "update administrators set jurisdiction = ?, pwd = ? where name=?";
  connection.connect();
  let queryParams = [jurisdiction, pwd, name];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}

function deleteAdminInfo(name, success) {
  connection = dbutil.createConnection();
  let querySql = "delete from administrators where name = ?;";
  connection.connect();
  connection.query(querySql, name, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}

module.exports = {
  // queryAllStudent: queryAllStudent,
  queryAdminLoginInfo: queryAdminLoginInfo,
  queryAdminNumber: queryAdminNumber,
  queryAdminInfo: queryAdminInfo,
  addAdminInfo: addAdminInfo,
  updateAdminInfo: updateAdminInfo,
  deleteAdminInfo: deleteAdminInfo,
};
