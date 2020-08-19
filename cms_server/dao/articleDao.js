const dbutil = require("./dbutil");
let connection;
function addArticleInfo(
  article_upload_time,
  article_modify_time,
  article_title,
  article_tags,
  article_img_fileName,
  article_img_url,
  article_content_html,
  article_content_raw,
  success
) {
  connection = dbutil.createConnection();
  let querySql =
    "insert into article_list (article_upload_time,article_modify_time,article_title,article_tags,article_img_fileName,article_img_url,article_content_html,article_content_raw) values (?,?,?,?,?,?,?,?);";
  connection.connect();
  let queryParams = [
    article_upload_time,
    article_modify_time,
    article_title,
    article_tags,
    article_img_fileName,
    article_img_url,
    article_content_html,
    article_content_raw,
  ];
  // console.log(queryParams);
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
  });
  connection.end();
}
function searchArticleInfo(success) {
  connection = dbutil.createConnection();
  let querySql =
    "select article_id,article_upload_time,article_modify_time,article_title,article_tags,article_img_url,article_intro from article_list;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);

      // connection.release();
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function searchArticleContent(id,success) {
  connection = dbutil.createConnection();
  let querySql =
    "select article_content_html article_content_raw from article_content union all select article_upload_time,article_title from article_list;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);

      // connection.release();
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function editArticleInfo(
  article_modify_time,
  article_title,
  article_tags,
  article_content_html,
  article_content_raw,
  historyTitle,
  success
) {
  connection = dbutil.createConnection();
  let querySql =
    "update article_list set article_modify_time = ?,article_title = ?, article_tags = ?,article_content_html=?,article_content_raw=? where article_title=?";
  connection.connect();

  let queryParams = [
    article_modify_time,
    article_title,
    article_tags,
    article_content_html,
    article_content_raw,
    historyTitle,
  ];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
    connection.end();
  });
}

function deleteArticleInfo(
  article_upload_time,
  article_title,
  article_tags,
  success
) {
  connection = dbutil.createConnection();
  let querySql =
    "delete from article_list where article_upload_time= ? and article_title= ? and article_tags = ?;";
  connection.connect();
  let queryParams = [article_upload_time, article_title, article_tags];
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
  addArticleInfo: addArticleInfo,
  searchArticleInfo: searchArticleInfo,
  searchArticleContent:searchArticleContent,
  deleteArticleInfo: deleteArticleInfo,
  editArticleInfo: editArticleInfo,
};
