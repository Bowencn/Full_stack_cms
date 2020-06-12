const imageService = require("../service/imageService");
let path = new Map();

uploadImg = (originalname, destination, filename, request, response) => {
  console.log("uploadImg");
  imageService.addImageInfo(originalname, destination, filename, (result) => {
    console.log("controller:", result);
    // response.writeHead(200);
    response.end();
  });
};
path.set("/uploadImg", uploadImg);

queryImageInfo = (request, response) => {
  console.log("c");
  imageService.queryImageInfo((result) => {
    // console.log("controller:", JSON.stringify(result));
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/queryImageInfo", queryImageInfo);
module.exports.path = path;
