import userService from "../services/userService";

let handleGetUser = async (req, res) => {
    
  
    try {
        let data = await userService.handleGetUser();
        console.log(data);
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let abc = async (req, res) => {

    try {
        let data = await userService.handleGetUser();
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    handleGetUser:handleGetUser,
    abc:abc

}