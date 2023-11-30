import  express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import apiAPP from "./route/apiApp";
const http = require('http');
const socketIo = require('socket.io');
import webBanHang from "./route/webBanHang";
import webQuanTri from "./route/webQuanTri";
var admin = require("firebase-admin");

var serviceAccount = require("./thongbao-1a22a-firebase-adminsdk-1s0fh-ce90bbbf80.json");

import test from "./route/test";
var cookieParser = require('cookie-parser')
var path = require("path");

import cors from "cors";
require('dotenv').config();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
let app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({origin:true}))
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')))
app.use(cookieParser())

viewEngine(app);
apiAPP(app);
webQuanTri(app);
webBanHang(app);
test(app);

io.on('connection', (socket) => {
    console.log('A client connected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
app.post('/api/send-notification', (req, res) => {
    const registrationToken = "dz_1FlGhQ4ag_g7t1Xbef7:APA91bGVRA7cgamIDb_ruectoKhO5djE2r-N9u8B7JPLS5F1H7l0niB35q2tFoc-zG0OcfkG16lrx8-nb9QE2M-5IgcXiUBuRowPhk_gLTbH5PZouh7zguRzPjSeZ7Dm7qO1mawoAN6c";
  
 // Thay thế bằng mã token thiết bị
    
    const message = {
      notification: {
        title: 'Notification Title',
        body: 'Notification Body',
      },
      token: registrationToken,
    };
    
    admin.messaging().send(message)
      .then((response) => {
        return res.status(200).json(response)
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  });

let port = process.env.PORT || 8000;
server.listen(port,()=>{
    console.log("đang chạy PORT: " + port);
});