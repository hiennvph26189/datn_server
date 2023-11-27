import db from "../../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);
let ProfileMembersService = (id) => {

    return new Promise(async (resolve, reject) => {

        try {
            if (id) {

                let userMember = await db.Members.findOne({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    userMember
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User không tồn tại",
                })
            }

        } catch (error) {
            reject(error);
        }


    })

}
let EditProfileMembersService = (data) => {

    return new Promise(async (resolve, reject) => {
        console.log(data);
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Member không tồn tại"
                })
            }
            let member = await db.Members.findOne({
                where: { id: data.id },
                raw: false


            });
            if (member) {
                member.tenThanhVien = data.tenThanhVien,
                    member.anhDaiDien = data.anhDaiDien,
                    member.soDienThoai = data.soDienThoai,
                    member.diaChi = data.diaChi,
                    member.gioiTinh = data.gioiTinh,

                    await member.save()

                resolve({
                    errCode: 0,
                    errMessage: "Sửa thành công"
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User không tồn tại"
                })
            }

        } catch (error) {
            reject(error);
        }


    })

}
let napTienMembersService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            // console.log(data.idUser);
            let isExit = checkUserMember(data.idUser)
            // console.log(isExit)

            if (isExit === false) {
                resolve({
                    errCode: 2,
                    errMessage: "Members không tồn tại"
                })
            } else {

                await db.Prices.create({
                    anhCK: data.anhCK,
                    idUser: data.idUser,
                    tienNap: data.tienNap,
                    status: data.status
                })
                await db.Members.update(
                    { status: 1 },
                    { where: { id: data.idUser } }
                )
                resolve({
                    errCode: 0,
                    errMessage: "Đã nạp tiền"
                })
            }
        } catch (error) {
            reject(error);
        }


    })
}
let lichSuNapTienMembersService = (id) => {
    return new Promise(async (resolve, reject) => {
        console.log(id, "adfadf")
        try {
            // console.log(data.idUser);
            let isExit = checkUserMember(id)
            // console.log(isExit)

            if (isExit === false) {
                resolve({
                    errCode: 2,
                    errMessage: "Members không tồn tại"
                })
            } else {
                let res = {}
                let price = await db.Prices.findAll({
                    where: { idUser: id },
                });
                res.errCode = 0;
                res.errMessage = "OK",
                    res.data = price;

                resolve(res)
            }
        } catch (error) {
            reject(error);
        }


    })
}
let getOneMember = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            // console.log(data.idUser);
            // let isExit = checkUserMember(data.idUser)
            // console.log(isExit)


            let member = await db.Members.findOne(

                { where: { id: id } }
            )
            if (member) {
                resolve({
                    errCode: 0,
                    errMessage: "Đã hủy nạp tiền",
                    member: member
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Tài khoản không tồn tại",
                    member: {}
                })
            }


        } catch (error) {
            reject(error);
        }


    })
}
module.exports = {
    
    ProfileMembersService: ProfileMembersService,
    EditProfileMembersService: EditProfileMembersService,
    napTienMembersService:napTienMembersService,
    lichSuNapTienMembersService:lichSuNapTienMembersService,
    getOneMember:getOneMember
}