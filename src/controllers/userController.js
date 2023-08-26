import userService from "../services/userService";

let handleGetUser = async (req, res) => {
    try {
        let userList = await userService.handleGetUser();
        return res.render('admin/user.ejs',{userList:userList.result}) 
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
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

 let handlerCreateUser = async(req, res) => {
    try {
        let data = req.body;
       console.log("dữ liệu đã thêm: ", data.lastname);
        let dulieu = await userService.handleCreateUser(data);
         return res.redirect("/user");
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
    
 }
 let deleteUser = async(req, res) => {
    try {
       console.log("đã xóa người dùng: ", req.params.id);
        let dulieu = await userService.deleteUser(req.params.id);
         return res.redirect("/user");
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
    
 }
 
module.exports = {
    handleGetUser:handleGetUser,
    handlerCreateUser:handlerCreateUser,
    deleteUser:deleteUser,
}