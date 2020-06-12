const dbutil = require("./dbutil");
let connection;
function addBannerInfo(dataList, success) {
  connection = dbutil.createConnection();
  let querySql =
    "insert into banner_info (serial_number, name,image_url_info,tags) values (?,?,?,?);";
  connection.connect();
  for (let index = 0; index < dataList.length; index++) {
    let item = dataList[index];
    let serial_number = item.serial_number;
    let name = item.name;
    let image_url_info = item.image_url_info;
    let tags = item.tags;
    let queryParams = [serial_number, name, image_url_info, tags];
    console.log(queryParams);
    connection.query(querySql, queryParams, (error, result) => {
      if (error == null) {
        success(result);
      } else {
        // console.log("dao:", error);
      }
    });
  }
  connection.end();
}
function deleteBannerInfo(success) {
  connection = dbutil.createConnection();
  let querySql = "delete from banner_info;";
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
function searchBannerInfo(success) {
  connection = dbutil.createConnection();
  let querySql =
    "select serial_number, name,image_url_info,tags from banner_info;";
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

function updateBannerInfo(serial_number, name, image_url_info, tags,last_serial_number, success) {
  connection = dbutil.createConnection();
  let querySql =
    "update banner_info set serial_number = ?, name = ?,image_url_info=?,tags=? where serial_number=?";
  connection.connect();
  
  let queryParams = [serial_number, name, image_url_info, tags,last_serial_number];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}

function deleteBannerInfo(serial_number, success) {
  connection = dbutil.createConnection();
  let querySql = "delete from banner_info where serial_number = ?;";
  connection.connect();
  connection.query(querySql, serial_number, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}

module.exports = {
  addBannerInfo: addBannerInfo,
  updateBannerInfo: updateBannerInfo,
  deleteBannerInfo: deleteBannerInfo,
  searchBannerInfo: searchBannerInfo,
};
