const articleDao = require("../dao/articleDao");
addArticleInfo = (
  article_upload_time,
  article_modify_time,
  article_title,
  article_tags,
  article_img_fileName,
  article_img_url,
  article_content_html,
  article_content_raw,
  success
) => {
    articleDao.addArticleInfo(
    article_upload_time,
    article_modify_time,
    article_title,
    article_tags,
    article_img_fileName,
    article_img_url,
    article_content_html,
    article_content_raw,
    success
  );
};
deleteArticleInfo=(article_upload_time,article_title,article_tags, success)=>{
  articleDao.deleteArticleInfo(article_upload_time,article_title,article_tags,success)
}
searchArticleContent=(id,success)=>{
  articleDao.searchArticleContent(id,success)
}
searchArticleInfo=(success)=>{
    articleDao.searchArticleInfo(success)
}
editArticleInfo=(article_modify_time,article_title,article_tags,article_content_html,article_content_raw,historyTitle, success)=>{
  articleDao.editArticleInfo(article_modify_time,article_title,article_tags,article_content_html,article_content_raw,historyTitle, success)
}
module.exports = {
  addArticleInfo: addArticleInfo,
  "deleteArticleInfo":deleteArticleInfo,
  searchArticleContent:searchArticleContent,
  "searchArticleInfo":searchArticleInfo,
  editArticleInfo:editArticleInfo
};
