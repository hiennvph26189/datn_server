
import db from "../../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);
let handleGetAllMembers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let members = await db.Members.findAll({
                attributes: {
                    exclude: ['matKhau']
                }
            });
            res.errCode = 0;
            res.errMessage = "OK",
                res.data = members;
            console.log(res.data)
            resolve(res)
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Members.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password.toString(), salt);

            resolve(hashPassword);

        } catch (error) {
            reject(error);
        }


    })
}





let EditMembersService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Members không tồn tại"
                })
            }
            let members = await db.Members.findOne({
                where: { id: data.id },
                raw: false


            });
            if (members) {

                members.tenThanhVien = data.tenThanhVien,
                    members.gioiTinh = data.gioiTinh,
                    members.anhDaiDien = data.anhDaiDien,

                    members.soDienThoai = data.soDienThoai,
                    members.diaChi = data.diaChi,
                    members.tienTk = data.tienTk,
                    members.status = data.status,

                    await members.save()

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
let checkUserMember = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.Members.findOne({
                where: { id: id }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
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
let napTienMembersServiceAdmin = (data) => {
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
                let price = await db.Members.findOne({
                    where: { id: data.idUser }
                })
                let priceMembers = price.tienTk
                await db.Prices.update(
                    {
                        status: 1
                    },
                    { where: { id: data.id } }
                )
                await db.Members.update(
                    {
                        status: 0,
                        tienTk: parseInt(priceMembers) + parseInt(data.tienNap)
                    },
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
let huyNapTienMembersServiceAdmin = (id, idMember) => {
    return new Promise(async (resolve, reject) => {

        try {
            // console.log(data.idUser);
            // let isExit = checkUserMember(data.idUser)
            // console.log(isExit)

            console.log(idMember, "Â;dk;s")
            await db.Prices.update(
                {
                    status: 2,

                },
                { where: { id: id } }
            )
            await db.Members.update({
                status: 0,

            }, { where: { id: idMember } })
            resolve({
                errCode: 0,
                errMessage: "Đã hủy nạp tiền"
            })

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
let deleteMembersService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            // console.log(data.idUser);
            // let isExit = checkUserMember(data.idUser)
            // console.log(isExit)
            let members = await db.Members.findOne({ id: id })
            if (members) {
                await db.Members.destroy(

                    { where: { id: id } }
                )
                resolve({
                    errCode: 0,
                    errMessage: "Đã Xóa tài khoản"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "user không tồn tại"
                })
            }


        } catch (error) {
            reject(error);
        }


    })
}
let DeleteNapTienMember = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            // console.log(data.idUser);
            // let isExit = checkUserMember(data.idUser)
            // console.log(isExit)
            let Price = await db.Prices.findOne({ id: id })
            if (Price && Price.status != 0) {
                await db.Prices.destroy(

                    { where: { id: id } }
                )
                resolve({
                    errCode: 0,
                    errMessage: "Đã Xóa Price"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Price không tồn tại"
                })
            }


        } catch (error) {
            reject(error);
        }


    })
}
module.exports = {
    handleGetAllMembers: handleGetAllMembers,
   
   
    EditMembersService: EditMembersService,
    deleteMembersService: deleteMembersService,
    napTienMembersService: napTienMembersService,
    lichSuNapTienMembersService: lichSuNapTienMembersService,
    napTienMembersServiceAdmin: napTienMembersServiceAdmin,
    huyNapTienMembersServiceAdmin: huyNapTienMembersServiceAdmin,
    getOneMember: getOneMember,
    DeleteNapTienMember: DeleteNapTienMember


}