const sliderService = require("../service/sliderService");
let path = new Map();
addSliderInfo = async (request, response) => {
  console.log("addSliderInfo");
  console.log(request.body);
  let title = request.body.title;
  let comment = request.body.comment && request.body.comment;
  let img_name;
  let img_url;
  if (request.body.imgInfo) {
    img_name = request.body.imgInfo.fileName;
    img_url = request.body.imgInfo.url;
  }
  if (title) {
    //   appreciateService.deleteAppreciateInfo((result) => {
    //     console.log("delete:", result);
    sliderService.addSliderInfo(title, comment, img_name, img_url, (result) => {
      console.log("controller:", result);
      response.end();
    });
    //   });
  } else {
    response
      .status(401)
      .json(`${"{payName:" + name + ", imgName:" + imgName + "}"}`);
  }
};
path.set("/addSliderInfo", addSliderInfo);
module.exports.path = path;
