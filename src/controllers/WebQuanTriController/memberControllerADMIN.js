import memberService from "../../services/webQuanTriService/memberServiceADMIN";

let handleGetAllMenbers = async (req, res) => {
    
  
    try {
        let page = req.query.page
        let data = await memberService.handleGetAllMembers(page);
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};



let handleEditMenbers = async (req, res) => {
    
  
    try {
        let data =  req.body
        let message = await  memberService.EditMembersService(data)
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
let handleDeleteMenbers = async (req, res) => {
    
  
    try {
        let data =  req.body.id
       
        let message = await  memberService.deleteMembersService(data.id)
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

let handleLoginMember = async (req, res) => {
    try {
        let email = req.body.email;
      
        let password = req.body.password;
        
        if(!email || !password){
            return res.status(500).json({
                errCode : 1,
                message : "Email và Password không được để trống"
            })
        }else{
            let userData = await memberService.handleUserMembersLogin(email, password)
            console.log(userData)
             return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user : userData.user?userData.user :{}
       
       
       
    })
        }
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};

let handleNapTienMenbersADmin = async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let message = await  memberService.napTienMembersServiceAdmin(data)
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
let handleHuyNapTienMenbersADmin = async (req, res) => {
    try {
        let data = req.body.id;
        let idMember = req.body.idUser;
        console.log(data);
        let message = await  memberService.huyNapTienMembersServiceAdmin(data,idMember)
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

let handleLichSuNapMenbersAdmin = async (req, res) => {
    try {
        let data = req.query.id
        
        let message = await  memberService.lichSuNapTienMembersService(data)
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

let handleDeleteNapTienMenber = async (req, res) => {
    try {
        let id = req.query.id
        
        let message = await  memberService.DeleteNapTienMember(id)
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
    handleGetAllMenbers:handleGetAllMenbers,
    
    handleDeleteMenbers:handleDeleteMenbers,
    handleLoginMember:handleLoginMember,
   
    
    handleEditMenbers:handleEditMenbers,
    handleLichSuNapMenbersAdmin:handleLichSuNapMenbersAdmin,
    handleNapTienMenbersADmin:handleNapTienMenbersADmin,
    handleHuyNapTienMenbersADmin:handleHuyNapTienMenbersADmin,
    handleDeleteNapTienMenber:handleDeleteNapTienMenber
    
}