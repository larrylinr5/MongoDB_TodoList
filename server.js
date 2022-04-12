//#region 功能載入區塊
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
// 讀取功能 api
const { getTodo, getTodos } = require('./getTodo');
// 新增功能 api
const postTodo = require('./postTodo');
// 刪除功能 api
const { deleteTodos, deleteTodo } = require('./deleteTodo');
// 單筆修改功能 api
const patchTodo = require('./patchTodo');
//#endregion

//#region 連接資料庫
// 遠端連線字串
const connectString = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)
// 連線字串
mongoose.connect(connectString)
//#endregion

const requestListener = async (req, res) => {
  const { headers, message } = libs
  const { url, method } = req
  /** requestListener 資訊與清單物件 */
  const data = {
    /** requestListener req */
    req,
    /** requestListener res */
    res
  }

  if (url === "/todos" && method === "GET") {
    getTodos(data)
  } else if (url.startsWith("/todos/") && method === "GET") {
    getTodo(data)
  } else if (url === "/todos" && method === "POST") {
    postTodo(data)
  } else if (url === "/todos" && method === "DELETE") {
    deleteTodos(data)
  } else if (url.startsWith("/todos/") && method === "DELETE") {
    deleteTodo(data)
  } else if (url.startsWith("/todos/") && method === "PATCH") {
    patchTodo(data)
  } else if (method === "OPTIONS") {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandler(res, 404, message[404])
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);