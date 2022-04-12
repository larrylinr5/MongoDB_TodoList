const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')
const Todo = require("./models/todo");

/** 取得所有Todo資料
 * @param data requestListener 資訊與清單物件
 */
const getTodos = async (data) => {
    const { res } = data;
    const todos = await Todo.find();
    successHandler(res, todos)
}

/** 取得單一Todo資料
 * @param data 列表資料
 */
const getTodo = async (data) => {
    const { req, res } = data;
    const id = req.url.split('/').pop();
    const todos = await Todo.findById(id);

    if (todos) {
        successHandler(res, todos);
    } else {
        const { noData } = message
        errorHandler(res, 400, noData);
    }
}

module.exports = {
    getTodo,
    getTodos
};