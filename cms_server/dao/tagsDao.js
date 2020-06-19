const dbutil = require("./dbutil");
let connection;
function addTags(name, success) {
  connection = dbutil.createConnection();
  // let data = "";
  // for (let index = 0; index < nameList.length; index++) {
  //   index === nameList.length - 1 ? (data += "(?)") : (data += "(?),");
  // }
  let querySql = `insert into category_navigation (tags_name) values (?);`;
  connection.connect();
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
function searchTagsIdWithName(name, success) {
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
function searchTagsNameIsTrue(name, success) {
  connection = dbutil.createConnection();

  let querySql = `select count(1) as count from category_navigation where tags_name = ?;`;
  //   console.log(querySql);
  connection.connect();
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
function searchChildrenTagsNameIsTrue(name, success) {
  connection = dbutil.createConnection();

  let querySql = `select count(1) as count from category_children_nav where children_tags_name = ?;`;
  //   console.log(querySql);
  connection.connect();
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
function addChildrenTags(name, pid, success) {
  connection = dbutil.createConnection();
  let data = "(?," + pid + ")";
  let querySql = `insert into category_children_nav (children_tags_name,father_id) values ${data};`;
  let queryParams = name;
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
  });
}
function searchTags(success) {
  connection = dbutil.createConnection();

  let querySql = `select id,tags_name from category_navigation;`;
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
function searchChildrenTags(success) {
  connection = dbutil.createConnection();
  let querySql = `select father_id,children_tags_name from category_children_nav`;
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
  addTags: addTags,
  searchTags: searchTags,
  searchChildrenTags:searchChildrenTags,
  searchTagsIdWithName: searchTagsIdWithName,
  addChildrenTags: addChildrenTags,
  searchTagsNameIsTrue: searchTagsNameIsTrue,
  searchChildrenTagsNameIsTrue: searchChildrenTagsNameIsTrue,
};
