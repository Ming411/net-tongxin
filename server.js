const net = require('net');
// 创建服务端实例
const server = net.createServer();

const PORT = 1234;
const HOST = 'localhost';

server.listen(PORT, HOST);

server.on('listening', () => {
  console.log(`${HOST}:${PORT}`);
});

server.on('connection', socket => {
  socket.on('data', chunk => {
    const msg = chunk.toString();
    console.log(msg);
    // 给客户端返回数据
    socket.write(Buffer.from('你好' + msg)); // 传递给客户端
  });
});
server.on('close', () => {
  console.log('服务端关闭了');
});
server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址被占用');
  } else {
    console.log(err);
  }
});
