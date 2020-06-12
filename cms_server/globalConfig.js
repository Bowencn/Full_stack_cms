const fs = require('fs');

let globalConfig = {}
let config = fs.readFileSync('server.conf')
let configs = config.toString().split('\r\n')
for (let index = 0; index < configs.length; index++) {
    let element = configs[index].split('=')
    globalConfig[configs[index].split('=')[0]] = configs[index].split('=')[1]
}
if (globalConfig.static_file_type) {
    globalConfig.static_file_type = globalConfig.static_file_type.split("|")
} else {
    throw new Error("配置文件异常，缺少：static_file_type")
}
module.exports = globalConfig