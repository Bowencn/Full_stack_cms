const mysql = require('mysql');
createConnection=()=>{
    let connection = mysql.createConnection({
        host:'104.36.67.35',
        port:'3306',
        user:'root',
        password:'FcCtRp6nTRR2eMfY',
        database:'blog_CMS'
    })
    return connection
}
module.exports.createConnection = createConnection