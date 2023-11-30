const socketIO = require('socket.io');
const server = require('http').createServer();

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  // Gửi thông báo đến client khi có kết nối mới
  socket.emit('notification', 'Hello from server!');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = io;