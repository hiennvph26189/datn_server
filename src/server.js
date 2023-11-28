import  express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import apiAPP from "./route/apiApp";
import webQuanTri from "./route/webQuanTri";
import webBanHang from "./route/webBanHang";
import test from "./route/test";
var cookieParser = require('cookie-parser')
var path = require("path");

import cors from "cors";
require('dotenv').config();

let app = express();
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




let port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("đang chạy PORT: " + port);
});