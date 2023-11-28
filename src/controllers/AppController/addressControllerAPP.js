import addressService from "../../services/appServices/addressServiceAPP";
let handlePostAddressMembers = async (req, res) => {
    try {
        let data  = req.body;
        let postAddress = await addressService.postDataAddressService(data);
        if(postAddress.errCode == 1){
            return res.status(200).json(postAddress)
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let handleDeleteAddressMembers = async (req, res) => {
    try {
        let data  = req.body;
        let postAddress = await addressService.deleteAddressService(data);
        if(postAddress.errCode == 1){
            return res.status(200).json(postAddress)
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let handlePutAddressMembers = async (req, res) => {
    try {
        let data  = req.body;
        let postAddress = await addressService.putAddressService(data);
        if(postAddress.errCode == 1){
            return res.status(200).json(postAddress)
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let handleEditStatusAddressMembers = async (req, res) => {
    try {
        let data  = req.body;
        let postAddress = await addressService.EditStatusAddressService(data);
        if(postAddress.errCode == 1){
            return res.status(200).json(postAddress)
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
module.exports = {
    handlePostAddressMembers:handlePostAddressMembers,
    handleDeleteAddressMembers:handleDeleteAddressMembers,
    handlePutAddressMembers:handlePutAddressMembers,
    handleEditStatusAddressMembers:handleEditStatusAddressMembers
};