import db from "../../models/index";

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
module.exports = {
    
    ProfileMembersService: ProfileMembersService,
    EditProfileMembersService: EditProfileMembersService,

}