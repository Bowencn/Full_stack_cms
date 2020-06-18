const dbutil = require("./dbutil");
let connection;
function addTags(nameList, success) {
  connection = dbutil.createConnection();
  let data = "";
  for (let index = 0; index < nameList.length; index++) {
    index === nameList.length - 1 ? (data += "(?)") : (data += "(?),");
  }
  let querySql = `insert into category_navigation (tags_name) values ${data};`;
  console.log(querySql);
  connection.connect();
  let queryParams = nameList;
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
function searchTags(name, success) {
  connection = dbutil.createConnection();

  let querySql = `select id from category_navigation where tags_name = ?;`;
  //   console.log(querySql);
  //   connection.connect();
  let queryParams = [name];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
function addChildrenTags(list, pid, success) {
  connection = dbutil.createConnection();
  let data = "";
  for (let index = 0; index < list.length; index++) {
    index === list.length - 1
      ? (data += "(?," + pid + ")")
      : (data += "(?," + pid + "),");
  }
  let querySql = `insert into category_children_nav (children_tags_name,father_id) values ${data};`;
  //   console.log(querySql);
  //   connection.connect();
  let queryParams = list;
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
module.exports = {
  addTags: addTags,
  searchTags: searchTags,
  addChildrenTags: addChildrenTags,
};
