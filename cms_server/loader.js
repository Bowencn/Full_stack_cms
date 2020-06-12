const fs = require('fs');
const globalConfig = require('./globalConfig');

let controllerSet=[]
let pathMap = new Map()

let files = fs.readdirSync(globalConfig["web_path"])

for (let index = 0; index < files.length; index++) {
    let temp = require("./"+globalConfig["web_path"]+"/"+files[index])
    // console.log(temp)
    if(temp.path){
        for (let [k,v] of temp.path) {
            if(pathMap.get(k) == null){
                pathMap.set(k,v)
            }else{
                throw new Error("url path 异常:"+ k)
            }
        }
        controllerSet.push(temp)
    }
}
// console.log(pathMap)
module.exports = pathMap