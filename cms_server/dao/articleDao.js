const dbutil = require("./dbutil");
let connection;
function addArticleInfo(
  article_title,
  article_tags,
  article_intro,
  article_upload_time,
  article_modify_time,
  article_uuid,
  article_img_fileName,
  article_img_url,
  article_content_html,
  success
) {
  connection = dbutil.createConnection();
  let querySql = `insert into article_list (article_id,article_upload_time,article_modify_time,article_title,article_tags,article_img_fileName,article_img_url,article_intro) values (?,?,?,?,?,?,?,?);insert into article_content (article_uuid,article_content_html) values ('${article_uuid}','${article_content_html}');`;
  connection.connect();
  let queryParams = [
    article_uuid,
    article_upload_time,
    article_modify_time,
    article_title,
    article_tags,
    article_img_fileName,
    article_img_url,
    article_intro,
    // article_uuid,
    // article_content_html,
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
    "select article_id,article_upload_time,article_img_url,article_modify_time,article_title,article_tags,article_img_url,article_intro from article_list;";
  connection.connect();
  connection.query(querySql, (error, result) => {
    if (error == null) {
      success(result);

      // connection.release();
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
function searchArticleInfoWithTag(tag, success) {
  connection = dbutil.createConnection();
  let querySql =
    "select article_id,article_upload_time,article_img_url,article_modify_time,article_title,article_tags,article_img_url,article_intro from article_list where article_tags=?;";
  connection.connect();
  let queryParams = [tag];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    connection.end();
  });
}
function searchArticleContent(id, success) {
  connection = dbutil.createConnection();
  let querySql =
    "select article_title,article_upload_time,article_img_url,article_content_html from article_content ac right join article_list al on ac.article_uuid = al.article_id where ac.article_uuid=?;";
  connection.connect();
  let queryParams = [id];
  connection.query(querySql, queryParams, (error, result) => {
    if (error == null) {
      success(result);
    } else {
      console.log("dao:", error);
    }
    // connection.end();
  });
}
function editArticleInfo(
  article_modify_time,
  article_title,
  article_tags,
  article_content_html,
  article_id,
  intro,
  article_img_fileName,
  article_img_url,
  success
) {
  connection = dbutil.createConnection();
  let querySql;
  article_img_fileName && article_img_url
    ? (querySql =
        "update article_list set article_modify_time = ?,article_title = ?, article_tags = ?,article_intro=?,article_img_fileName='" +
        article_img_fileName +
        "',article_img_url='" +
        article_img_url +
        `' where article_id=?;update article_content set article_content_html = '${article_content_html}';`)
    : (querySql = `update article_list set article_modify_time = ?,article_title = ?, article_tags = ?,article_intro=? where article_id=?;update article_content set article_content_html = '${article_content_html}';`);

  connection.connect();

  let queryParams = [
    article_modify_time,
    article_title,
    article_tags,
    intro,
    article_id,
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

function deleteArticleInfo(article_id, success) {
  connection = dbutil.createConnection();
  let querySql =
    "delete from article_list where article_id= ?;delete from article_content where article_uuid= '" +
    article_id +
    "';";
  connection.connect();
  let queryParams = [article_id];
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
  searchArticleInfoWithTag:searchArticleInfoWithTag,
  searchArticleContent: searchArticleContent,
  deleteArticleInfo: deleteArticleInfo,
  editArticleInfo: editArticleInfo,
};
