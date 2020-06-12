const dbutil = require("./dbutil");
let connection;
function addPersonalInfo(name,autograph,user_image, success) {
    connection = dbutil.createConnection();
    let querySql =
      "insert into personal_information (name,autograph,user_image) values (?,?,?);";
    connection.connect();
      let queryParams = [name,autograph,user_image];
      connection.query(querySql, queryParams, (error, result) => {
        if (error == null) {
          success(result);
        } else {
          console.log("dao:", error);
        }
      });
    connection.end();
  }
  function searchPersonalInfo(success) {
    connection = dbutil.createConnection();
    let querySql =
      "select name,autograph,user_image from personal_information;";
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
  
  function deletePersonalInfo(success) {
    connection = dbutil.createConnection();
    let querySql = "delete from personal_information;";
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

  function editPersonalInfo(name,autograph,user_image,historyName, success) {
    connection = dbutil.createConnection();
    let querySql =
      "update personal_information set name=?,autograph=?,user_image=? where article_title=?";
    connection.connect();
    
    let queryParams = [name,autograph,user_image,historyName];
    connection.query(querySql, queryParams, (error, result) => {
      if (error == null) {
        success(result);
      } else {
        console.log(error);
      }
      connection.end();
    });
  }
  module.exports = {
    addPersonalInfo: addPersonalInfo,
    searchPersonalInfo:searchPersonalInfo,
    deletePersonalInfo:deletePersonalInfo
  };
  