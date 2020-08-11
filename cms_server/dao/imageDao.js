const dbutil = require("./dbutil");
let connection;
function addImageInfo(originalname, destination, filename, success) {
  connection = dbutil.createConnection();
  let querySql =
    "insert into image_info (original_name, destination, filename) values (?,?,?);";
  connection.connect();
  let queryParams = [originalname, destination, filename];
  console.log(queryParams);
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function queryImageInfo(success) {
  connection = dbutil.createConnection();
  let querySql =
    "select original_name, destination, filename from image_info;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function queryAImageInfo(filename,success){
  console.log(2,filename)
  connection = dbutil.createConnection();
  let querySql =
    "select * from image_info where filename='"+filename+"';";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function deleteImageInfo(filename,success) {
  connection = dbutil.createConnection();
  let querySql =
    "delete from image_info where filename='"+filename+"';";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
module.exports = {
  addImageInfo: addImageInfo,
  queryImageInfo:queryImageInfo,
  queryAImageInfo:queryAImageInfo,
  deleteImageInfo:deleteImageInfo
};
