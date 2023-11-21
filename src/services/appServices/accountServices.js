const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import bcrypt from 'bcryptjs';
import dateTime from "../getDate";


const salt = bcrypt.genSaltSync(10);
const hashMembersPassword = (membersPassword) => {
    let hashPassword = bcrypt.hashSync(membersPassword, salt);
    return hashPassword;
}


let handleGetMembersServices = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
                SELECT *
                FROM members
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
                data: data
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handleAddMembersServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let tenThanhVien = data.tenThanhVien;
            let email = data.email;
            let gioiTinh =data.gioiTinh;
            let anhDaiDien = data.anhDaiDien;
            let soDienThoai = data.soDienThoai;
            let diaChi = data.diaChi;
            let hashPass = hashMembersPassword(data.matKhau);
            
            let date = dateTime.getdate();
             await sequelize.query(`

             INSERT INTO members (email,tenThanhVien,gioiTinh,anhDaiDien,soDienThoai,diaChi,matKhau, createdAt, updatedAt)
             VALUES ('${email}','${tenThanhVien}','${gioiTinh}','${anhDaiDien}','${soDienThoai}','${diaChi}','${hashPass}', '${date}', '${date}');
                `, { type: QueryTypes.INSERT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handlePutMembersServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let selectIdMembers = await sequelize.query(`
            SELECT *
            FROM members
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdMembers.length > 0) {
                let id = data.id;
                let tenThanhVien = data.tenThanhVien;
                let email = data.email;
                let gioiTinh =data.gioiTinh;
                let anhDaiDien = data.anhDaiDien;
                let soDienThoai = data.soDienThoai;
                let diaChi = data.diaChi;
                let hashPass = hashMembersPassword(data.matKhau);
                let date = dateTime.getdate();
                await sequelize.query(`

                 UPDATE members
                 SET email = '${email}',tenThanhVien = '${tenThanhVien}',gioiTinh = '${gioiTinh}',anhDaiDien = '${anhDaiDien}',soDienThoai = '${soDienThoai}',diaChi = '${diaChi}',matKhau = '${hashPass}', updatedAt = '${date}'
                 WHERE id=${id};
                    `, { type: QueryTypes.UPDATE });

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'không tồn tại sản phẩm',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleGetMembersServices:handleGetMembersServices,
    handleAddMembersServices:handleAddMembersServices,
    handlePutMembersServices:handlePutMembersServices
}