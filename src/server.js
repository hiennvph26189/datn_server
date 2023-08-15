import  express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import webBanHang from "./route/webBanHang";
var path = require("path");
import cors from "cors";
require('dotenv').config();

let app = express();
app.use(cors({origin:true}))
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')))
viewEngine(app);
initWebRouter(app);
webBanHang(app);




let port = process.env.PORT;
app.listen(port,()=>{
    console.log("đang chạy PORT: " + port);
});