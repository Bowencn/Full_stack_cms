const articleDao = require("../dao/articleDao");
addArticleInfo = (
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
) => {
  articleDao.addArticleInfo(
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
  );
};
deleteArticleInfo = (article_id, success) => {
  articleDao.deleteArticleInfo(article_id, success);
};
searchArticleInfoWithTag=(tag,success)=>{
  articleDao.searchArticleInfoWithTag(tag,success)
}
searchArticleContent = (id, success) => {
  articleDao.searchArticleContent(id, success);
};
searchArticleInfo = (success) => {
  articleDao.searchArticleInfo(success);
};
editArticleInfo = (
  article_modify_time,
  article_title,
  article_tags,
  article_content_html,
  article_id,
  intro,
  article_img_fileName,
  article_img_url,
  success
) => {
  articleDao.editArticleInfo(
    article_modify_time,
    article_title,
    article_tags,
    article_content_html,
    article_id,
    intro,
    article_img_fileName,
    article_img_url,
    success
  );
};
module.exports = {
  addArticleInfo: addArticleInfo,
  deleteArticleInfo: deleteArticleInfo,
  searchArticleInfoWithTag:searchArticleInfoWithTag,
  searchArticleContent: searchArticleContent,
  searchArticleInfo: searchArticleInfo,
  editArticleInfo: editArticleInfo,
};
