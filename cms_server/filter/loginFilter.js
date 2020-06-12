const url = require("url");
const globalConf = require("../globalConfig");

loginFilter = (request, response) => {
  let pathName = url.parse(request.url).pathname;
  console.log(1,pathName)
  if (pathName == "/index.html" || pathName == "/serchAdmin"||pathName == "/addAdmin"|| pathName == "/updateAdmin" || pathName=="/deleteAdminInfo"||pathName=="/img" ||isStaticsRequest(pathName)) {
    console.log("放行")
    return true;
  }
  if (request.headers.cookie) {
    let cookies = request.headers.cookie.split(";");
    for (let index = 0; index < cookies.length; index++) {
        if (cookies[index].split("=")[0].trim()=="id") {
            return true
        }
        
    }
  }
  console.log("拦截")
  response.writeHead(302, { location: "/index.html" });
  response.end();
  return false;
};
function isStaticsRequest(pathName) {
  for (let index = 0; index < globalConf.static_file_type.length; index++) {
    // const element = array[index];
    let temp = globalConf.static_file_type[index];
    // console.log(pathName)
    if (temp == ".html") {
      continue;
    }
    if (pathName.indexOf(temp) == pathName.length - temp.length) {
      return true;
    }
    // console.log(globalConf.static_file_type[index]);
  }
}
module.exports = loginFilter;
