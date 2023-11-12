import { render } from "ejs";
import userService from "../services/userService";
import e from "cors";

let handleGetUser = async (req, res) => {
    try {
        let userList = await userService.handleGetUser();
        return res.render('admin/user.ejs', { userList: userList.result })

    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })

    }

};

/**
 * Xử lí lấy data từ form khi bấm nút thêm
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

let handlerCreateUser = async (req, res) => {
    try {
        let data = req.body;
        console.log("dữ liệu đã thêm: ", data.lastname);
        let dulieu = await userService.handleCreateUser(data);
        return res.redirect("/user");
    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}
let deleteUser = async (req, res) => {
    try {
        console.log("đã xóa người dùng: ", req.params.id);
        let dulieu = await userService.deleteUser(req.params.id);

        if (dulieu.errCode == 1) {
            return res.send(dulieu.errMessage)
        } else {
            return res.redirect("/user");
        }
    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}
const updateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserbyId(id);
    if (user.errCode == 1) {
        return res.send(user.errMessage)
    } else {
        return res.render("admin/update-user.ejs", { userData: user.result[0] });
    }
}


let handleUpdateUser = async (req, res) => {
    let data = req.body;
    await userService.updateUserInfo(data);
    return res.redirect("/user");
}
module.exports = {
    handleGetUser: handleGetUser,
    handlerCreateUser: handlerCreateUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    handleUpdateUser: handleUpdateUser,
}