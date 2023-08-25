import userService from "../services/userService";

let handleGetUser = async (req, res) => {
    
  
    try {
        let data = await userService.handleGetUser();
        return res.render('admin/user.ejs',{data:data}) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
 let handlerCreateUser = async(req, res) => {
    try {
        let data = req.body;
       console.log("dữ liệu là", data.email);
        let dulieu = await userService.handleCreateUser(data);
         return res.send("aloalo")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
    
    console.log("Dữ Liệu Là :",req.body)    
   

 }
 
module.exports = {
    handleGetUser:handleGetUser,
    handlerCreateUser:handlerCreateUser,
}