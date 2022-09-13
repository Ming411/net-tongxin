const net = require('net');
// 传递参数表示要连接那个主机
const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1'
});
let dataArr = ['whyccc1', 'whyccc2', 'whyccc3'];
client.on('connect', () => {
  client.write('whyccc'); // 传递给服务端
  // 直接像下面这种操作，会产生数据粘包
  // client.write('whyccc1');
  // client.write('whyccc2');
  // client.write('whyccc3');
  for (let i = 0; i < dataArr.length; i++) {
    (function (val, index) {
      setTimeout(() => {
        client.write(val);
      }, 1000 * (index + 1));
    })(dataArr[i], i);
  }
});
client.on('data', chunk => {
  console.log(chunk.toString()); // 接收服务端返回的数据
});
client.on('error', err => {
  console.log(err);
});
client.on('close', () => {
  console.log('客户端断开连接');
});
