const articleService = require("../service/articleService");
let path = new Map();
const uuid = require('node-uuid');
addArticleInfo = async (request, response) => {
  console.log("addArticleInfo");
  let dataList = request.body;
  // console.log(dataList);
  let imgInfo_fileName;
  let imgInfo_url;
  if (dataList.imgInfo) {
    imgInfo_fileName = dataList.imgInfo.fileName;
    imgInfo_url = dataList.imgInfo.url;
  }
  const creatuuid= uuid.v1()
  console.log(creatuuid)
  articleService.addArticleInfo(
    dataList.uploadTime,
    dataList.uploadTime,
    dataList.title,
    dataList.tags,
    imgInfo_fileName,
    imgInfo_url,
    // dataList.articleContent.html,
    // dataList.articleContent.raw,
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
    console.log('serach');
    // response.write(JSON.stringify(result));
    response.json({data:result})
    response.end();
  });
};

path.set("/searchArticleInfo", searchArticleInfo);

searchArticleContent= (request, response) => {
  console.log("searchArticleContent");
  let id = request.body.id
  console.log(id)
  articleService.searchArticleContent(id,(result) => {
    console.log('serach1');
    // response.write(JSON.stringify(result));
    response.json(result)
    response.end();
  });
};

path.set("/searchArticleContent", searchArticleContent);




deleteArticleInfo = (request, response) => {
  console.log("deleteArticleInfo");
  let data = request.body.deleteList;
  console.log(data);
  articleService.deleteArticleInfo(
    data.uploadTime,
    data.title,
    data.tags,
    (result) => {
      console.log("deleteArticleInfo---->result");
      response.write(JSON.stringify(result));
      response.end();
    }
  );
};
path.set("/deleteArticleInfo", deleteArticleInfo);

editArticleInfo = (request, response) => {
  let data = request.body;
  // console.log(data);
  articleService.editArticleInfo(
    data.modifyTime,
    data.title,
    data.tags,
    // data.articleContent.html,
    // data.articleContent.raw,
    data.historyTitle,
    (result) => {
      console.log("editArticleInfo---->result");
      response.write(JSON.stringify(result));
      response.end();
    }
  );
};

path.set("/editArticleInfo", editArticleInfo);
module.exports.path = path;
