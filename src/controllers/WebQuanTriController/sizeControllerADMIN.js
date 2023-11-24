import sizesServiceADMIN from "../../services/webQuanTriService/sizesServiceADMIN";
let getSizeADMIN = async (req, res) => {

    try {
            let id = req.query.id_sp
            let data = await sizesServiceADMIN.getSizesServiceADMIN(id);
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
    getSizeADMIN: getSizeADMIN,
}