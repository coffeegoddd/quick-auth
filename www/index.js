const http = require('http');
const assert = require('assert');
const app = require('./app');

const port = 3000;
const server = http.createServer(app);

server.listen(port, (err) => {
  assert.equal(err, null);
  console.log('we on! -->', port);
});
server.on('error', (err) => {
  console.error(err);
});