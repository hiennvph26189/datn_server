import userService from "../services/userService";

let handleGetUser = async (req, res) => {
    
  
    try {

        
        
      
       let test =await userService.handleGetUser();
       return res.status(200).json(test) 
    //    if(test.errCode == 0){
    //     return res.redirect('/add-category')
    //    }else{
    //     return "Lỗi"
    //    }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let addCategory = async (req, res) => {

    try {
        
        return res.render('ahc.ejs') 
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
    addCategory:addCategory

}