const fs = require('fs');
const globalConfig = require("./globalConfig")
let fileName = globalConfig.log_path+"/"+globalConfig.log_name
//日志
console.log(fileName)
log=(data)=>{
    fs.appendFile(fileName,data+"\n",()=>{
        // console.log(fileName)
    })
}
module.exports = log