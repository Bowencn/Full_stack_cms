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
module.exports = {
  addImageInfo: addImageInfo,
  queryImageInfo:queryImageInfo
};
