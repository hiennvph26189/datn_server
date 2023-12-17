import memberServiceAPP from "../../services/appServices/memberServiceAPP";

let handleProfileMember = async (req, res) => {
    
  
    try {
        let id = req.body.id;
 
        let message = await  memberServiceAPP.ProfileMembersService(id)
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
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleNapTienMenbers = async (req, res) => {
    try {
        let data = req.body;
        
        let message = await  memberServiceAPP.napTienMembersService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleLichSuNapMenbers = async (req, res) => {
    try {
        let id = req.query.id
        let message = await  memberServiceAPP.lichSuNapTienMembersService(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleGetOneMembers = async (req, res) => {
    try {
        let id = req.query.id
        
        let message = await  memberServiceAPP.getOneMember(id)
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
    handleNapTienMenbers:handleNapTienMenbers,
    handleLichSuNapMenbers:handleLichSuNapMenbers,
    handleGetOneMembers:handleGetOneMembers
};
