const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')
const Todo = require("./models/todo");

/** 新增單筆代辦
 * @param data requestListener 資訊與清單物件
 */
const postTodo = (data) => {
  const { req, res } = data;
  /** http 傳來的 body 資訊 */
  let body = "";

  // 監聽 req 當 req 收到片段的 chunk 時，將片段資料加入 body 內。
  req.on('data', chunk => {
    body += chunk;
  });

  // 監聽 req 當 req 收完資料時，執行新增單筆代辦的功能
  req.on('end', async () => {
    const { wrongColumn, postFail } = message
    try {
      const title = JSON.parse(body).title;
      if (title !== undefined) {
        const todos = await Todo.create(
          {
            title: title,
          }
        )
        successHandler(res, todos);
      } else {
        errorHandler(res, 400, wrongColumn);
      }
    } catch {
      errorHandler(res, 400, postFail);
    }
  });
};

module.exports = postTodo;