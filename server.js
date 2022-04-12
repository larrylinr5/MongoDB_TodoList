const http = require("http");
/** 載入 mongoose 套件 */
const mongoose = require('mongoose');
/** 載入 全域變數套件 */
const dotenv = require('dotenv');
// 全域變數套件設定
dotenv.config({ path: "./config.env" })
// 資源庫
const libs = require('./libs');
// 回應控制
const { errorHandler } = require('./responseHandler');

//#region 連接資料庫
// 遠端連線字串
const connectString = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)
// 遠端連線
mongoose.connect(connectString)
//#endregion

const requestListener = (req, res) => {
  const { headers, message } = libs
  
  if (method === "OPTIONS") {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandler(res, 404, message[404])
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);