
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

require('dotenv').config();
let checkLogin = async (req, res,next) => {
  
    try {
        
        const token = req.cookies.accessToken;
            if (!token) {
                // Redirect to login or handle unauthorized access
                return res.redirect('/get-login');
            } 
            const secretKey = process.env.MY_SECRET_KEY 
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                  return res.status(403).json({ message: 'Token verification failed' });
                }
                req.user = user;
                console.log(user)
                next();
              });
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let checkLoginAPI = async (req, res,next) => {
  
    try {
        
        const token = req.cookies.accessToken;
            if (!token) {
                // Redirect to login or handle unauthorized access
                return res.send({
                    errCode: 0,
                    errMessage: "Bạn chưa đăng nhập"
                });
            } 
            const secretKey = process.env.MY_SECRET_KEY 
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                  return res.status(403).json({ message: 'Token verification failed' });
                }
                req.user = user;
           
                next();
              });
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};


module.exports = {
    checkLogin:checkLogin,
    checkLoginAPI:checkLoginAPI,
    
}