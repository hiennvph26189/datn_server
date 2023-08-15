import danhSachService from "../services/danhSachService";
let listDanhSach = async (req, res) => {
    try {

       let data = await danhSachService.listDanhSachService();
       return res.status(200).json(data) 
 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let addDanhSach = async (req, res) => {
    try {
        let dulieunhap = req.body
        // console.log(dulieunhap)
        let data = await danhSachService.AddDanhSachService(dulieunhap);
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
    listDanhSach:listDanhSach,
    addDanhSach:addDanhSach
    

}