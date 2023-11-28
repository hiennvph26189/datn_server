const jwt = require('jsonwebtoken');
require('dotenv').config();
let convertToken2 = async (data) => {
  console.log(data);
        
        const secretKey = process.env.MY_SECRET_KEY
        const token = jwt.sign(data.toJSON(), secretKey, { expiresIn: '1d' });
       
       return token;
  //  console.log("Lỗi phân quyền",error)
  };
  module.exports  = {
    convertToken2:convertToken2
  
  }