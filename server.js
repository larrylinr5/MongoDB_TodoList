const http = require("http");
/** 載入 mongoose 套件 */
const mongoose = require('mongoose');
/** 載入 全域變數套件 */
const dotenv = require('dotenv')

// 全域變數套件設定
dotenv.config({ path: "./config.env" })

//#region 連接資料庫
// 本地連線
//mongoose.connect('mongodb://localhost:27017/hotel')

// 遠端連線
const connectString = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(connectString)
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
server.listen(process.env.PORT);