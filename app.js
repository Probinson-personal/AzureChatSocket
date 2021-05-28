
var fs = require('fs');
//const { Users } = require('./utils/users');
//var users = new Users();
const port=process.env.PORT || 3000

var options = {
  //key: fs.readFileSync('key.pem'),
  //cert: fs.readFileSync('server.crt'),
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
};

// var app = require('https').createServer(options, (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Request-Method', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
//   res.setHeader('Access-Control-Allow-Headers', '*');
// })

var io = require('socket.io')(app, {
  cors: {
    origin: '*',
  }
});
app.listen(port);


io.on('connection', (socket) => {
  console.log('new connection');
  socket.emit('connection', 'This is a message from the dark side.');

  // socket.on('sendLog', function (socket) {
  //   console.log('new log');
  //   console.log('socket > log.txt');
  // });

  socket.on('chatMessage', (params, callback) => {
    io.to(params.room).emit('newMessage', {
      room : params.room,
      message : params.message
    });
    

    console.log("chat nessage recieved");

    // callback({
    //   room : params.room,
    //   message : params.message
    // });
  });


  socket.on('join', (params, callback) => {
    //create user
    // var user = users.getUser(socket.id);
    // if (!user) {
    //   users.addUser(socket.id, params.name, params.room, params.avatar);
    //   user = users.getUser(socket.id);
    // }

    socket.join(params.room);       


    console.log("user join room " + params.room);
    
    callback({
      mes: "You have now joined " + params.room,
      userId: socket.id
    });


  })

})