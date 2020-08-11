const adminService = require("../service/adminService");
// const { request, response } = require("express");
let path = new Map();

login = (req, res) => {
  let data = req.body;
  adminService.queryAdminLoginInfo(data.username, (result) => {
    console.log(result);
    if (result[0]) {
      let info = result[0];
      console.log(result[0]);
      if (info.pwd == data.password) {
        res.json({
          code: 200,
          data: {
            message: "success",
            id: info.id,
            name: info.name,
            jurisdction: info.jurisdiction,
          },
        });
        res.end();
      } else {
        // res.writeHead(401);
        res.json({
          code: 401,
          data: {
            message: "password_error",
          },
        });
        res.end();
      }
    } else {
      console.log("e");
      // res.writeHead(401);
      res.json({
        code: 401,
        data: {
          message: "user_name_error",
        },
      });
      res.end();
    }
  });
};

path.set("/login", login);
serchAdmin = (request, response) => {
  adminService.queryAdminInfo((result) => {
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
  let params = request.body;
  console.log(params);
  adminService.addAdminInfo(
    params.name,
    params.jurisdiction,
    params.pwd,
    (result) => {
      console.log(result);
      response.writeHead(200);
      response.end();
    }
  );
};
path.set("/addAdmin", addAdmin);

updateAdmin = (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.write("options");
    response.end();
  } else {
    let data = request.body;
    if (data.name && data.jurisdiction && data.pwd) {
      adminService.updateAdminInfo(
        data.name,
        data.jurisdiction,
        data.pwd,
        (result) => {
          console.log(result);
          response.writeHead(200);
          response.end();
        }
      );
    } else {
      response.writeHead(400);
      response.write(data);
      response.end();
    }
  }
};
path.set("/updateAdmin", updateAdmin);

deleteAdminInfo = (request, response) => {
  console.log(request.body);
  if (request.method === "OPTIONS") {
    response.writeHead(200);
    response.write("options");
    response.end();
  } else {
    let data = request.body;
    adminService.deleteAdminInfo(data.name, (result) => {
      response.writeHead(200);
      response.end();
    });
  }
};
path.set("/deleteAdminInfo", deleteAdminInfo);

queryAdminNumber = (request, response) => {
  adminService.queryAdminNumber((result) => {
    // let resArr = {};
    // for (let index = 0; index < result.length; index++) {
    //   resArr[index] = result[index];
    // }
    console.log(result);
    // response.writeHead(200);
    // let resData = JSON.stringify(resArr);
    response.write(JSON.stringify(result[0]));
    response.end();
  });
};
path.set("/queryAdminNumber", queryAdminNumber);
module.exports.path = path;
