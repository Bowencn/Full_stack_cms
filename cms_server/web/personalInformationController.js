const personalInformationService = require("../service/personalInformation");
let path = new Map();

addPersonalInfo = async (request, response) => {
  console.log("addPersonalInfo");
  let data = request.body;
  console.log(data);
  let name = data.name;
  let autograph = data.autograph;
  let user_image = data.imgInfo && data.imgInfo.url;
  if (name, autograph, user_image) {
    personalInformationService.deletePersonalInfo((result) => {
      console.log("controller:", result);
      personalInformationService.addPersonalInfo(
        data.name,
        data.autograph,
        user_image,
        (result) => {
          console.log("controller:", result);
          response.end();
        }
      );
    });
  } else {
    response
      .status(401)
      .json(
        `${
          "{name:" +
          name +
          ", autograph:" +
          autograph +
          ", user_image:" +
          user_image +
          "}"
        }`
      );
  }
};
path.set("/addPersonalInfo", addPersonalInfo);

searchPersonalInfo = (request, response) => {
  console.log("searchPersonalInfo");
  personalInformationService.searchPersonalInfo((result) => {
    console.log(result);
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/searchPersonalInfo", searchPersonalInfo);
editPersonalInfo = (request, response) => {
  let dataList = request.body;
  console.log(dataList);
  personalInformationService.editPersonalInfo(
    name,
    autograph,
    user_image,
    historyName,
    (result) => {
      console.log(result);
      response.write(JSON.stringify(result));
      response.end();
    }
  );
};
path.set("/editPersonalInfo", editPersonalInfo);
module.exports.path = path;
