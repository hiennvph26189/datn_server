// install new node module : npm install crypto-js
let crypto = require('crypto');
const MERCHANT_KEY = 'juAOxL';
const MERCHANT_SECRET_KEY = '3Je7RxfgIzbgbTyUX6uIa2FzhcQv1apHdap';
const END_POINT = 'https://sand-payment.9pay.vn';



// This is url use for redirect to 9Pay portal


function getInvoiceNo(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function buildHttpQuery(data) {
    let httpQuery = new URLSearchParams();

    const ordered = Object.keys(data).sort().reduce(
        (obj, key) => { 
          obj[key] = data[key]; 
          return obj;
        }, 
        {}
      );    

    Object.keys(ordered).forEach(function (parameterName) {
        httpQuery.append(parameterName, ordered[parameterName]);
    });
    return httpQuery.toString();
}

function buildSignature(data, secret) {
    
    let token = crypto.createHmac("sha256", secret).update(data).digest().toString('base64');
    return token;
}
let get9Pay = async (req, res) => {
    
  
    try {
        if(req.query.result){
            const buff = Buffer.from(req.query.result, 'base64');

            // decode buffer as UTF-8
            const str = buff.toString('utf-8');
            let data = JSON.parse(str)
            return res.status(200).json(data);
        }
        return res.render("webBanHang/9Pay/thanh-toan-9pay.ejs")
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let post9Pay = async (req, res) => {
    
  
    try {
        
        var time = Math.round(Date.now() / 1000);
        var invoiceNo = getInvoiceNo(8);
        var amount = req.body.price; // This value is better than 3000 VND. We only use currency is "VND"
        var description = req.body.name;
        var returnUrl = "http://localhost:8001/get-9pay";
        var parameters = {
            "merchantKey": MERCHANT_KEY,
            "time": time,
            "invoice_no": invoiceNo,
            "amount": amount,
            "description": description,
            "return_url": returnUrl,
            "back_url": returnUrl,
        };
        var httpQuery = buildHttpQuery(parameters);
        var message = "POST" + "\n" + END_POINT + "/payments/create" + "\n" + time + "\n" + httpQuery;
        var signature = buildSignature(message, MERCHANT_SECRET_KEY);
        var baseEncode = Buffer.from(JSON.stringify(parameters)).toString('base64');
        var httpBuild = {
            "baseEncode": baseEncode,
            "signature": signature
        };
        var directUrl = END_POINT + "/portal?" + buildHttpQuery(httpBuild);

        return res.redirect(directUrl)
        
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let getAPI9Pay = async (req, res) => {
    
  
    try {
        if(req.query.result){
            const buff = Buffer.from(req.query.result, 'base64');

            // decode buffer as UTF-8
            const str = buff.toString('utf-8');
            let data = JSON.parse(str)
            console.log(data)
            return res.status(200).json({})
        }
        return res.render("webBanHang/9Pay/thanh-toan-9pay.ejs")
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let get9PayReturn = async (req, res) => {
    
  
    try {
        if(req.query.result){
            const buff = Buffer.from(req.query.result, 'base64');

            // decode buffer as UTF-8
            const str = buff.toString('utf-8');
            let data = JSON.parse(str)
            return res.status(200).json(data);
        }
        return res.redirect("exp://192.168.1.62:8081")
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let postAPI9Pay = async (req, res) => {
    
  
    try {
        
        var time = Math.round(Date.now() / 1000);
        var invoiceNo = getInvoiceNo(8);
        var amount = req.body.price; // This value is better than 3000 VND. We only use currency is "VND"
        var description = req.body.name;
        var returnUrl = "https://shopacc12312.000webhostapp.com/getThongtin.php";
        var parameters = {
            "merchantKey": MERCHANT_KEY,
            "time": time,
            "invoice_no": invoiceNo,
            "amount": amount,
            "description": description,
            "return_url": returnUrl,
            "back_url": returnUrl,
        };
        var httpQuery = buildHttpQuery(parameters);
        var message = "POST" + "\n" + END_POINT + "/payments/create" + "\n" + time + "\n" + httpQuery;
        var signature = buildSignature(message, MERCHANT_SECRET_KEY);
        var baseEncode = Buffer.from(JSON.stringify(parameters)).toString('base64');
        var httpBuild = {
            "baseEncode": baseEncode,
            "signature": signature
        };
        var directUrl = END_POINT + "/portal?" + buildHttpQuery(httpBuild);

        return res.status(200).json(directUrl)
        
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
module.exports = {
    get9Pay:get9Pay,
    post9Pay:post9Pay,
    postAPI9Pay:postAPI9Pay,
    getAPI9Pay:getAPI9Pay,
    get9PayReturn:get9PayReturn
    
   
}