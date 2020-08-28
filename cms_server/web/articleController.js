const articleService = require("../service/articleService");
let path = new Map();
const uuid = require("node-uuid");
addArticleInfo = async (request, response) => {
  console.log("addArticleInfo");
  let dataList = request.body;
  let imgInfo_fileName;
  let imgInfo_url;
  if (dataList.imgInfo) {
    imgInfo_fileName = dataList.imgInfo.fileName;
    imgInfo_url = dataList.imgInfo.url;
  }
  let tags = dataList.tags.toString();
  var introReg = /<(?<p>[^\s>]+)[^>]*>(.|\n)*?<\/\k<p>>/g;
  let intro = dataList.articleContent.html.match(introReg);
  console.log(dataList);
  // console.log(dataList);
  const article_uuid = uuid.v1();
  articleService.addArticleInfo(
    dataList.title,
    tags,
    intro[0],
    dataList.uploadTime,
    dataList.modifyTime || dataList.uploadTime,
    article_uuid,
    imgInfo_fileName,
    imgInfo_url,
    dataList.articleContent.html,
    (result) => {
      console.log("controller:result");
      response.write(JSON.stringify(result));
      response.end();
    }
  );
};
path.set("/addArticleInfo", addArticleInfo);

searchArticleInfo = (request, response) => {
  console.log("searchArticleInfo");

  articleService.searchArticleInfo((result) => {
    console.log("serach");
    // response.write(JSON.stringify(result));
    response.json({ data: result });
    response.end();
  });
};

path.set("/searchArticleInfo", searchArticleInfo);

searchArticleInfoWithTag = (request, response) => {
  console.log("searchArticleInfoWithTag");
  let data = request.body
  console.log(data)
  articleService.searchArticleInfoWithTag(data.tags,(result) => {
    console.log(result)
    response.json({ data: result });
    response.end();
  });
};

path.set("/searchArticleInfoWithTag", searchArticleInfoWithTag);
searchArticleContent = (request, response) => {
  console.log("searchArticleContent");
  let id = request.body.id;
  console.log(id);
  articleService.searchArticleContent(id, (result) => {
    console.log("serach1");
    // response.write(JSON.stringify(result));
    response.json(result);
    response.end();
  });
};

path.set("/searchArticleContent", searchArticleContent);

deleteArticleInfo = (request, response) => {
  console.log("deleteArticleInfo");
  let data = request.body;
  console.log(data);
  articleService.deleteArticleInfo(data.article_id, (result) => {
    console.log("deleteArticleInfo---->result");
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/deleteArticleInfo", deleteArticleInfo);

editArticleInfo = (request, response) => {
  let data = request.body;
  console.log(1,data);
  let tags = data.tags.toString();
  var introReg = /<(?<p>[^\s>]+)[^>]*>(.|\n)*?<\/\k<p>>/g;
  let intro = data.articleContent.html.match(introReg)[0];
  let imgInfo_fileName;
  let imgInfo_url;
  if (data.imgInfo) {
    imgInfo_fileName = data.imgInfo.fileName;
    imgInfo_url = data.imgInfo.url;
  }
  // console.log(intro)
  articleService.editArticleInfo(
    data.modifyTime,
    data.title,
    tags,
    data.articleContent.html,
    data.article_id,
    intro,
    imgInfo_fileName || null,
    imgInfo_url || null,
    (result) => {
      console.log("editArticleInfo---->result");
      response.write(JSON.stringify(result));
      response.end();
    }
  );
};

path.set("/editArticleInfo", editArticleInfo);
module.exports.path = path;
