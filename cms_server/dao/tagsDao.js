const dbutil = require("./dbutil");
let connection;
function addTags(name,herf, success) {
  connection = dbutil.createConnection();
  // let data = "";
  // for (let index = 0; index < nameList.length; index++) {
  //   index === nameList.length - 1 ? (data += "(?)") : (data += "(?),");
  // }
  let querySql = `insert into category_navigation (tags_name,tags_herf) values (?,?);`;
  connection.connect();
  let queryParams = [name,herf];
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
function addChildrenTags(name, herf, pid, success) {
  connection = dbutil.createConnection();
  let data = "(?," + pid + ",?)";
  let querySql = `insert into category_children_nav (children_tags_name,father_id,tags_c_herf) values ${data};`;
  let queryParams = [name, herf];
  console.log(querySql, queryParams);
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

  let querySql = `select id,tags_name as name,tags_herf as herf from category_navigation;`;
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
  let querySql = `select id,father_id,children_tags_name,tags_c_herf as herf from category_children_nav`;
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
function deleteTags(id,success){
  connection = dbutil.createConnection();
  let querySql = `delete from category_navigation where id=?`;
  let queryParams = [id];
  console.log(querySql)
  connection.connect();
  connection.query(querySql,queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });

}
function deleteChildrenTags(id,success){
  connection = dbutil.createConnection();
  let querySql = `delete from category_children_nav where id=?`;
  let queryParams = [id];
  connection.connect();
  connection.query(querySql,queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });

}
function deleteHasChildrenTags(id,success){
  connection = dbutil.createConnection();
  let querySql = `SET foreign_key_checks = 0;delete category_navigation,category_children_nav from category_navigation INNER JOIN category_children_nav on category_children_nav.father_id=category_navigation.id where category_navigation.id=?;SET foreign_key_checks = 1;`;
  let queryParams = [id];
  // console.log(querySql)
  connection.connect();
  connection.query(querySql,queryParams, (error, result) => {
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
  searchChildrenTags: searchChildrenTags,
  searchTagsIdWithName: searchTagsIdWithName,
  addChildrenTags: addChildrenTags,
  searchTagsNameIsTrue: searchTagsNameIsTrue,
  searchChildrenTagsNameIsTrue: searchChildrenTagsNameIsTrue,
  deleteTags:deleteTags,
  deleteChildrenTags:deleteChildrenTags,
  deleteHasChildrenTags:deleteHasChildrenTags
};
