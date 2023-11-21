const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('dotenv').config();
let setToken = async (req, res,dataUser) => {
    
  
    try {
        const user = dataUser;
        const secretKey = process.env.MY_SECRET_KEY
        const token = jwt.sign(user, secretKey, { expiresIn: '1d' });

        res.setHeader('Set-Cookie', cookie.serialize('accessToken', token, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60, // 30 days in seconds
          sameSite: 'strict',
          path: '/'
        }));
     
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let convertToken2 = async (data) => {
    
  
    try {
        
        const secretKey = process.env.MY_SECRET_KEY
        const token = jwt.sign(data, secretKey);
        
       return token;
     
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  module.exports = {
    setToken:setToken,
    convertToken2:convertToken2

  }