import accountServiceAPP from "../../services/appServices/accountServiceAPP";
const nodemailer = require('nodemailer');

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
let handleChangePassMembers = async (req, res) => {
    try {
        let data = req.body

            let userData = await accountServiceAPP.handleUserMembersChangePassService(data);
            return res.status(200).json(userData);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleForGotAccount = async (req, res) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
      
        const email = req.body.email
        let checkEmail = await accountServiceAPP.checkUserEmail(email);
        console.log(checkEmail);
        if(checkEmail == true){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'testsendnodemail@gmail.com',
                    pass: 'qhvb xuyd sfjo vslc',
                },
            });
    
            const mailOptions = {
                from: 'testsendnodemail@gmail.com',
                to: email,
                subject: "mã lấy lại mật khẩu",
                text: `Mã xác minh của bạn là ${verificationCode}`
            };
    
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json(error.toString());
                } else {
                    let message = await  accountServiceAPP.handleForGotAccountService(email,verificationCode);
                
                    return res.status(200).json(message);
                }
    
            });
        }else if(checkEmail == false){
            let message = {
                errCode: 1,
                errMessage:"Tài khoản của bạn chưa được đăng kí"
            }
           
            return res.status(200).json(message);
        }
        
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleXacMinhEmail = async (req, res) => {
    try {
            let data = req.body
            let message = await accountServiceAPP.handleXacMinhEmailService(data);
     
            return res.status(200).json(message);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleLayLaiMatKhauMember = async (req, res) => {
    try {
            let data = req.body
           
            let message = await accountServiceAPP.handleLayLaiMatKhauMemberService(data);
     
            return res.status(200).json(message);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleNapTienMenbers = async (req, res) => {
    try {
            let data = req.body
           
            let message = await accountServiceAPP.handleNapTienMenbersService(data);
     
            return res.status(200).json(message);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleDetailNapTienMenbers = async (req, res) => {
    try {
            let id = req.query.id_thanhtoan
           
            let message = await accountServiceAPP.handleDetailNapTienMenbersService(id);
     
            return res.status(200).json(message);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
module.exports = {
    handleLoginMember: handleLoginMember,
    handleAddMembers:handleAddMembers,
    handleChangePassMembers:handleChangePassMembers,
    handleForGotAccount:handleForGotAccount,
    handleXacMinhEmail:handleXacMinhEmail,
    handleLayLaiMatKhauMember:handleLayLaiMatKhauMember,
    handleNapTienMenbers:handleNapTienMenbers,
    handleDetailNapTienMenbers:handleDetailNapTienMenbers
};
