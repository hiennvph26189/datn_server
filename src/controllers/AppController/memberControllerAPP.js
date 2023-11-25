import memberServiceAPP from "../../services/appServices/memberServiceAPP";

let handleProfileMember = async (req, res) => {
    
  
    try {
        let id = req.body.id;
 
        let message = await  memberServiceAPP.ProfileMembersService(id)
        console.log(message)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleEditProfileMember = async (req, res) => {
    
  
    try {
        
        let message = await  memberServiceAPP.EditProfileMembersService(req.body)
        console.log(message)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    handleProfileMember:handleProfileMember,
    handleEditProfileMember:handleEditProfileMember,
};
