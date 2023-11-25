import accountServiceAPP from "../../services/appServices/accountServiceAPP";
let handleLoginMember = async (req, res) => {
    try {
        let email = req.body.email;

        let password = req.body.password;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Email và Password không được để trống",
            });
        } else {
            let userData = await accountServiceAPP.handleUserMembersLoginService(
                email,
                password
            );
            console.log(userData);
            return res.status(200).json({
                errCode: userData.errCode,
                message: userData.errMessage,
                user: userData.user ? userData.user : {},
            });
        }
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleAddMembers = async (req, res) => {
    
  
        
    try {
       
        let message = await  accountServiceAPP.AddMembersService(req.body)
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
    handleLoginMember: handleLoginMember,
    handleAddMembers:handleAddMembers,
};
