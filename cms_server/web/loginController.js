const studentService = require("../service/studentService");
const { request, response } = require("express");
let path = new Map();

serchAdmin = (request, response) => {
  studentService.queryAdminInfo((result) => {
    let resArr = {};
    for (let index = 0; index < result.length; index++) {
      resArr[index] = result[index];
    }
    response.writeHead(200);
    let resData = JSON.stringify(resArr);
    response.write(resData);
    response.end();
  });
};
path.set("/serchAdmin", serchAdmin);

addAdmin = (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.write("options");
    response.end();
  } else {
    request.on("data", (data) => {
      let params = JSON.parse(data.toString());
      console.log(params);
      if (params.name && params.jurisdiction && params.pwd) {
        studentService.addAdminInfo(
          params.name,
          params.jurisdiction,
          params.pwd,
          (result, errorCode) => {
            console.log(result, errorCode);
            if (result === "error") {
              if (errorCode === 'ER_DUP_ENTRY') {
                response.writeHead(401);
                response.write(errorCode.toString());
                response.end();
              }
            } else {
              console.log(result);
              response.writeHead(200);
              response.end();
            }
          }
        );
      } else {
        response.writeHead(400);
        response.write(params);
        response.end();
      }
    });
  }
};
path.set("/addAdmin", addAdmin);

updateAdmin = (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.write("options");
    response.end();
  } else {
    request.on("data", (data) => {
      let params = JSON.parse(data.toString());
      console.log(params);
      if (params.name && params.jurisdiction && params.pwd) {
        studentService.updateAdminInfo(
          params.name,
          params.jurisdiction,
          params.pwd,
          (result) => {
            console.log(result);
            response.writeHead(200);
            response.end();
          }
        );
      } else {
        response.writeHead(400);
        response.write(params);
        response.end();
      }
    });
  }
};
path.set("/updateAdmin", updateAdmin);

deleteAdminInfo = (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.write("options");
    response.end();
  } else {
    request.on("data", (data) => {
      let params = JSON.parse(data.toString());
      console.log(params);
      studentService.deleteAdminInfo(params.name, (result) => {
        response.writeHead(200);
        // response.write(params);
        response.end();
      });
    });
  }
};
path.set("/deleteAdminInfo", deleteAdminInfo);

queryAdminNumber=(request,response)=>{
  studentService.queryAdminNumber((result) => {
    // let resArr = {};
    // for (let index = 0; index < result.length; index++) {
    //   resArr[index] = result[index];
    // }
    console.log(result)
    // response.writeHead(200);
    // let resData = JSON.stringify(resArr);
    // response.write(resData);
    response.end();
  });
}
path.set("/queryAdminNumber", queryAdminNumber);
module.exports.path = path;
