const fs = require('fs');
const globalConfig = require('./globalConfig');
let files = fs.readdirSync(globalConfig['filter_path'])

let filterSet = []

for (let index = 0; index < files.length; index++) {
    let temp = require('./'+globalConfig['filter_path']+'/'+files[index])
    filterSet.push(temp)
}
module.exports=filterSet