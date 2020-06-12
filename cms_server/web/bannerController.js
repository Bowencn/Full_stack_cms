const bannerService = require("../service/bannerService");
let path = new Map();

addBannerInfo = async (request, response) => {
  console.log("addBannerInfo");
  // console.log(request.body);
  let dataList = request.body;
  // for (let index = 0; index < dataList.length; index++) {
  //   const element = array[index];

  // }
  //   let name = request.body.payName;
  //   let imgName = request.body.imgInfo.fileName;
  //   let imgUrl = request.body.imgInfo.url;
  //   if (serial_number && name && image_url_info && tags) {
  bannerService.addBannerInfo(dataList, (result) => {
    console.log("controller:", result);
    response.end();
  });
  //   } else {
  //     response
  //       .status(401)
  //       .json(`${"{payName:" + name + ", imgName:" + imgName + "}"}`);
  //   }
};
path.set("/addBannerInfo", addBannerInfo);

searchBannerInfo = (request, response) => {
  console.log("searchBannerInfo");
  bannerService.searchBannerInfo((result) => {
    console.log(result);
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/searchBannerInfo", searchBannerInfo);
deleteBannerInfo = (request, response) => {
  let data = request.body;
  // console.log(data);
  bannerService.deleteBannerInfo(data.serial_number, (result) => {
    // console.log(result);
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/deleteBannerInfo", deleteBannerInfo);
updateBannerInfo = (request, response) => {
  let dataList = request.body;
  // console.log(dataList);
  for (let index = 0; index < dataList.length; index++) {
    const element = dataList[index];
    for (const key in element) {
      if (key === "last_serial_number") {
        bannerService.updateBannerInfo(
          element.serial_number,
          element.name,
          element.image_url_info,
          element.tags,
          element.last_serial_number,
          (result) => {
            console.log(result);
            response.write(JSON.stringify(result));
            response.end();
          }
        );
      }
    }
  }
};
path.set("/updateBannerInfo", updateBannerInfo);
module.exports.path = path;
