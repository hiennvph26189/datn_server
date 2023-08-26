const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
import bcrypt from 'bcryptjs';

 const salt = bcrypt.genSaltSync(10);
 const hashUserPassword = (userPassword) => {
        let hashPassword = bcrypt.hashSync(userPassword, salt);
        return hashPassword;
 }
 
let handleGetUser = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const result = await sequelize.query(`
                SELECT *
                FROM users
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })    
                
                 
        } catch (error) {
             reject(error);
        }
             
     }) 
}
let handleCreateUser = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let firstName = data.firstname;
            let lastName = data.lastname;
            let email = data.email;
            let hashPass = hashUserPassword(data.password);  
            let phoneNumber = data.phonenumber;
            let address = data.address;
            let roleID = data.gioitinh;
            var today = new Date();
            const result = await sequelize.query(`
            INSERT INTO users (firstName, lastName, email, password, phoneNumber, address, roleID, createdAT, updatedAT)
            VALUES ('${firstName}', '${lastName}', '${email}', '${hashPass}', '${phoneNumber}', '${address}', '${roleID}', '${today}', '${today}');
                `, { type: QueryTypes.INSERT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })     
  
        } catch (error) {
             reject(error);
        }
        
     }) 
}
    let deleteUser = (id) => {
        return new Promise(async(resolve, reject)=>{
       
            try {
                const result = await sequelize.query(`
                DELETE FROM users WHERE id='${id}';
                    `, { type: QueryTypes.DELETE });
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        result:result
                     })    
                          
            } catch (error) {
                 reject(error);
            }
                 
         }) 
    }

module.exports  = {
    handleGetUser:handleGetUser,
    handleCreateUser:handleCreateUser,
    deleteUser:deleteUser,
}