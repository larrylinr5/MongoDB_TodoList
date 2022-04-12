const http = require("http");

const requestListener = (req, res) => {
  console.log('hello')
}

const server = http.createServer(requestListener);
server.listen(3005);