const dbutil = require("./dbutil");
let connection;
function addAppreciateInfo(name, imgName,imgUrl, success) {
  let querySql =
    "insert into appreciate_info (payment_method_name, image_name,image_url) values (?,?,?);";
  //   connection.connect();
  let queryParams = [name, imgName,imgUrl];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function deleteAppreciateInfo(success) {
  connection = dbutil.createConnection();
  let querySql = "delete from appreciate_info;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
function searchAppreciateInfo(success) {
    connection = dbutil.createConnection();
    let querySql = "select payment_method_name,image_name,image_url from appreciate_info;";
    connection.connect();
    connection.query(querySql, (error, result) => {
      if (error == null) {
        success(result);
      } else {
        console.log("dao:", error);
      }
      // connection.end();
    });
  }
module.exports = {
  addAppreciateInfo: addAppreciateInfo,
  deleteAppreciateInfo: deleteAppreciateInfo,
  searchAppreciateInfo:searchAppreciateInfo
};
