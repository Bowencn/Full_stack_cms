const appreciateService = require("../service/appreciateService");
let path = new Map();

addAppreciateInfo = async (request, response) => {
  console.log("addAppreciateInfo");
  console.log(request.body);
  let name = request.body.payName;
  let imgName = request.body.imgInfo.fileName;
  let imgUrl = request.body.imgInfo.url;
  if (name && imgName && imgUrl) {
    appreciateService.deleteAppreciateInfo((result) => {
      console.log("delete:", result);
      appreciateService.addAppreciateInfo(name, imgName, imgUrl, (result) => {
        console.log("controller:", result);
        response.end();
      });
    });
  } else {
    response
      .status(401)
      .json(`${"{payName:" + name + ", imgName:" + imgName + "}"}`);
  }
};
path.set("/addAppreciateInfo", addAppreciateInfo);

searchAppreciateInfo = (request, response) => {
  console.log("searchAppreciateInfo");
  appreciateService.searchAppreciateInfo((result) => {
    console.log(result);
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/searchAppreciateInfo", searchAppreciateInfo);
module.exports.path = path;
