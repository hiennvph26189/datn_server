const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"

import sequelize from "../../config/queryDatabse"
let getSanPhamService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       

        try {
            const listSanPham = await sequelize.query(`
                SELECT *
                FROM products
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          console.log(listSanPham)
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listSanPham:listSanPham
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
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
                errCode: 0,
                errMessage: 'thành công',
                result: result
            })

        } catch (error) {
            reject(error);
        }

    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkuser = await sequelize.query(`
            SELECT *
            FROM users
             WHERE id='${id}';
                `, { type: QueryTypes.SELECT });
            if (checkuser.length <= 0) {
                resolve({
                    errCode: 1,
                    errMessage: 'User Khong ton tai',
                    result: null
                })
            } else {
                const result = await sequelize.query(`
                DELETE FROM users WHERE id='${id}';
                    `, { type: QueryTypes.DELETE });
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    result: result
                })
            }

        } catch (error) {
            reject(error);
        }

    })
}

let getUserbyId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await sequelize.query(`
                SELECT *
                FROM users
                 WHERE id='${id}';
                    `, { type: QueryTypes.SELECT });

            if (result.length <= 0) {
                resolve({
                    errCode: 1,
                    errMessage: 'User Khong ton tai',
                    result: null
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    result: result
                })
            }

        } catch (error) {
            reject(error);
        }

    })
}
const updateUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await sequelize.query(`
                UPDATE users
                SET firstName = '${data.firstname}',lastName = '${data.lastname}',email = '${data.email}',password = '${data.password}',phoneNumber = '${data.phonenumber}',address = '${data.address}'
                WHERE id='${data.id}';
                    `, { type: QueryTypes.UPDATE });

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

module.exports = {
 
    handleCreateUser: handleCreateUser,
    deleteUser: deleteUser,
    getUserbyId: getUserbyId,
    updateUserInfo: updateUserInfo,
}