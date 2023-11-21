
import db from "../models/index";
import sequelize from "../config/queryDatabse"
import getDate from "./getDate";
import bcrypt from 'bcryptjs';
const { QueryTypes } = require('sequelize');


const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const getAllUser = async () => {
    try {
        let users = await db.User.findAll(
            {
        }
        );
        if (users) {
          
            return {
                EM: 'get data success', //error message
                EC: '0', // Error code
                DT: users,
            }

        } else {
            return {
                EM: 'get data success', //error message
                EC: '0', // Error code
                DT: [],
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'somthing wrong with serviece', //error message
            EC: '1', // Error code
            DT: [],
        }
    }

}
const getUserWithPagination = async (page, limit) => {
    try {
       let offset = (page - 1) * limit;
       const { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id","firstName", "lastName", "email", "phoneNumber", "address"],

       })
       let totalPages = Math.ceil(count/limit);
       let data = {
        totalRows: count,
        totalPages:totalPages,
        users: rows
       }
       

       return {
        EM: 'fetch ok', //error message
        EC: '0', // Error code
        DT: data,
    }
    } catch (error) {
        console.log(error)
        return {
            EM: 'somthing wrong with serviece', //error message
            EC: '1', // Error code
            DT: [],
        }
    }
}

const createNewUser = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let firstName = data.firstName;
            let lastName = data.lastName;
            let email = data.email;
            let hashPass = hashUserPassword(data.password);
            let phoneNumber = data.phoneNumber;
            let address = data.address;
            let roleID = data.gioitinh;
            var today = getDate.getdate();
            const result = await sequelize.query(`
            INSERT INTO users (firstName, lastName, email, password, phoneNumber, address, roleID, createdAT, updatedAT)
            VALUES ('${firstName}', '${lastName}', '${email}', '${hashPass}', '${phoneNumber}', '${address}', '${roleID}', '${today}', '${today}');
                `, { type: QueryTypes.INSERT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
                result: result
            })

        } catch (error) {
            reject(error);
        }

    })
}

const updateUser = async(data) => {
    return new Promise(async(resolve, reject)=>{  
        try {
            let selectIdCategory = await sequelize.query(`
            SELECT *
            FROM users
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdCategory.length>0) {
                let id = data.id;
                let firstName = data.firstName;
            let lastName = data.lastName;
            let email = data.email;
            let hashPass = hashUserPassword(data.password);
            let phoneNumber = data.phoneNumber;
            let address = data.address;
            let roleID = data.gioitinh;
            var today = getDate.getdate();
                 await sequelize.query(`
                 UPDATE users
                 SET firstName = '${firstName}',lastName = '${lastName}',email = '${email}',password = '${hashPass}',phoneNumber = '${phoneNumber}',address = '${address}', updatedAt = '${today}'
                 WHERE id=${id};
                    `, { type: QueryTypes.UPDATE });
              
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                     })  
            }else {
                resolve({ 
                    errCode:1,
                    errMessage: 'không tồn tại sản phẩm',
                 })  
            }
        } catch (error) {
             reject(error);
        }
     }) 
  
}

const deleteUser = async(data) => {
    return new Promise(async(resolve, reject)=>{
       
        try {
            let SelectUser = await sequelize.query(`
            SELECT *
            FROM users
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (SelectUser.length>0) {
                let id = data.id;
                 await sequelize.query(`
                 DELETE FROM users WHERE id=${id}
                    `, { type: QueryTypes.DELETE });
                console.log(id)
              
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                     })  
            }else {
                resolve({ 
                    errCode:1,
                    errMessage: 'không tồn tại sản phẩm',
                 })  
            }
        } catch (error) {
             reject(error);
        }
     }) 
}

module.exports = {
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserWithPagination: getUserWithPagination,
}