const http = require("http");
const url = require("url");
const globalConfig = require("./globalConfig");
const fs = require("fs");
const loader = require("./loader");
const filterSet = require("./filterLoader");
const log = require("./log");
const express = require("express");
const multer = require("multer");
const app = express();
var upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
  })
);
app.use(bodyParser.json({limit: '50mb'}));

//跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Content-Length,Authorization,Accept,x-requested-with"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  // console.log('kuayu')
  next();
});
//个人信息
app.post(`/addPersonalInfo`,loader.get(`/addPersonalInfo`))
app.get(`/searchPersonalInfo`,loader.get(`/searchPersonalInfo`))
//分类标签
app.post(`/addTags`,loader.get(`/addTags`))
app.get(`/searchTags`,loader.get(`/searchTags`))
//文章列表
app.post(`/addArticleInfo`,loader.get(`/addArticleInfo`))
app.get(`/searchArticleInfo`,loader.get(`/searchArticleInfo`))
app.delete(`/deleteArticleInfo`,loader.get(`/deleteArticleInfo`))
app.post(`/editArticleInfo`,loader.get(`/editArticleInfo`))
//slider
app.post(`/addSliderInfo`,loader.get(`/addSliderInfo`))

//banner
app.post(`/addBannerInfo`,loader.get(`/addBannerInfo`))
app.get(`/searchBannerInfo`,loader.get(`/searchBannerInfo`))
app.delete(`/deleteBannerInfo`,loader.get(`/deleteBannerInfo`))
app.post(`/updateBannerInfo`,loader.get(`/updateBannerInfo`))
//网站统计
app.get(`/queryAdminNumber`,loader.get(`/queryAdminNumber`))
//管理员接口
app.get("/serchAdmin", loader.get("/serchAdmin"));
app.post("/addAdmin", loader.get("/addAdmin"));
app.post("/updateAdmin", loader.get("/updateAdmin"));
app.delete("/deleteAdminInfo", loader.get("/deleteAdminInfo"));
//赞赏设置接口
app.post("/addAppreciateInfo", loader.get("/addAppreciateInfo"));
app.get(`/searchAppreciateInfo`, loader.get(`/searchAppreciateInfo`)); //获取赞赏设置信息
//图片
app.post("/uploadImage", upload.single("avatar"), function (req, res, next) {
  let file = req.file;
  loader.get("/uploadImg")(
    file.originalname,
    file.destination,
    file.filename,
    req,
    res
  );
  console.log(file)
  res.status(200).json({fileName: file.filename ,url: file.destination+file.filename});
});
app.get("/queryImageInfo", loader.get("/queryImageInfo"));
//图片在线查看，输入图片名字--->未使用
app.get(`/uploads/:name`, (req, res, next) => {
  let rs = fs.createReadStream("./uploads/" + req.params.name);
  // console.log(rs);
  res.set("Content-Type", "image/jpeg");
  rs.pipe(res);
});


app.listen(globalConfig["port"]);
























// http.createServer((request,response)=>{
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     response.setHeader("Access-Control-Allow-Origin","*");
//     //跨域允许的header类型
//     response.setHeader("Access-Control-Allow-Headers","Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
//     //跨域允许的请求方式
//     response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     let pathName = url.parse(request.url).pathname;
//     for (let index = 0; index < filterSet.length; index++) {
//         let flag = filterSet[index](request,response);
//         if (!flag) {
//             return
//         }
//     }

//     let isStatic = isStaticsRequest(pathName)
//     if(isStatic){//静态请求
//         log(globalConfig["page_path"]+pathName)
//         try {
//             let data = fs.readFileSync(globalConfig["page_path"]+pathName)
//             response.writeHead(200)
//             response.write(data)
//             response.end()
//         } catch (error) {
//             response.writeHead(404)
//             response.write("<html><body><h1>404</h1></body></html>")
//             response.end()
//         }
//     }else{//动态请求
//         if(loader.get(pathName) != null){
//             try {
//                 loader.get(pathName)(request,response)
//             } catch (error) {
//                 response.writeHead(500)
//                 response.write("<html><body><h1>500</h1></body></html>")
//                 response.end()
//             }
//         }else{
//             response.writeHead(404)
//             response.write("<html><body><h1>404</h1></body></html>")
//             response.end()
//         }
//     }

// }).listen(globalConfig['port'])

function isStaticsRequest(pathName) {
  for (let index = 0; index < globalConfig.static_file_type.length; index++) {
    let temp = globalConfig.static_file_type[index];
    if (pathName.indexOf(temp) == pathName.length - temp.length) {
      return true;
    }
  }
}
