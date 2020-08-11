const imageService = require("../service/imageService");
let path = new Map();
var fs = require('fs');
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
  imageService.queryImageInfo((result) => {
    // console.log("controller:", JSON.stringify(result));
    response.write(JSON.stringify(result));
    response.end();
  });
};
path.set("/queryImageInfo", queryImageInfo);
deleteImageInfo = (req, res) => {
  console.log(req.body.imgName);
  let filename= req.body.imgName
  return new Promise((resolve,reject)=>{
    imageService.queryAImageInfo(filename,(result) => {
      // console.log("controller:", result);
      // response.write(JSON.stringify(result));
      // response.end();
    console.log('q',result)
      if(result){
        // console.log(result)
        resolve(result[0])
      }else{
        reject('error')
      }
    });
  }).then(result=>{
    return new Promise((resolve,reject)=>{
      imageService.deleteImageInfo(result.filename,(res) => {
        // console.log("controller:", r);
        // response.write(JSON.stringify(result));
        // response.end();
        console.log('d',res)
        if(res){
          resolve(result)
        }else{
          reject('error')
        }
      });
    })
  }).then(result=>{
    console.log('f',result)
    fs.unlinkSync(`uploads/${result.filename}`)
    res.json({
      code: 0,
      data: false,
      msg: `delete id ${result.filename} success`
    })
  }).catch(err=>{ // 异常响应
    res.json({
      code: 1,
      data: [],
      msg: `error: ${err}`
    })
  }).finally(()=>{ // 结束请求
    res.end()
  })
  
};
path.set("/deleteImageInfo", deleteImageInfo);
module.exports.path = path;
