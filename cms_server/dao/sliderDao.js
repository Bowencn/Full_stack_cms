const dbutil = require("./dbutil");
let connection;
function addSliderInfo(title, comment, img_name, img_url, success) {
    connection = dbutil.createConnection();
  let querySql =
    "insert into slider_info (title, comment,image_name,image_url) values (?,?,?,?);";
    connection.connect();
  let queryParams = [title, comment, img_name, img_url];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function deleteSliderInfo(success) {
  connection = dbutil.createConnection();
  let querySql = "delete from slider_info;";
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
// function searchSInfo(success) {
//     connection = dbutil.createConnection();
//     let querySql = "select payment_method_name,image_name,image_url from appreciate_info;";
//     connection.connect();
//     connection.query(querySql, (error, result) => {
//       if (error == null) {
//         success(result);
//       } else {
//         console.log("dao:", error);
//       }
//       // connection.end();
//     });
//   }
module.exports = {
  addSliderInfo: addSliderInfo,
  deleteSliderInfo: deleteSliderInfo,
  //   searchAppreciateInfo:searchAppreciateInfo
};
