const http = require("http");
/** 載入 mongoose 套件 */
const mongoose = require('mongoose');

//#region 連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.log(error);
  });
//#endregion

const requestListener = (req, res) => {
  console.log('hello')
}

const server = http.createServer(requestListener);
server.listen(3005);