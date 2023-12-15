import addressServiceAPP from "../../services/appServices/addressServiceAPP";
import checkIDMember from "./orderController"
const jwt = require('jsonwebtoken');
require('dotenv').config();
let getDiaChimember = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/addressMember.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};  
let handleItemListAddess = async (req, res) => {
    try {
        var cookie = req.cookies.accessToken;
        let id_member = checkIDMember.checkIdUser(req, res,cookie)
        let getAddress = await addressServiceAPP.GetAddressService(id_member);
        
        return res.render("webBanHang/itemListAddress.ejs",{listAddress:getAddress.listAddress}) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let addDiaChiMemmber = async (req, res) => {
    try {
        var cookie = req.cookies.accessToken;
        let id_member = checkIDMember.checkIdUser(req, res,cookie)
        let getAddress = await addressServiceAPP.GetAddressService(id_member);
        let data = req.body
        let phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if(data.name == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng nhập họ tên"
            }) 
        }
        if(data.phone == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng nhập số điện thoại"
            }) 
        }if(phoneNumber.test(data.phone) === false){
            return res.send({
                errCode:1,
                errMessage:"Số điện thoại không đúng định dạng"
            }) 
        }
        if(data.phone == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng nhập số điện thoại"
            }) 
        }
        if(data.tenTinh == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng chọn địa chỉ"
            }) 
        }
        if(data.tenQuanHuyen == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng chọn quận huyện"
            }) 
        }
        if(data.tenXaPhuong == ""){
            return res.send({
                errCode:1,
                errMessage:"Vui lòng chọn xã hoặc phường"
            }) 
        }
        if(data.detai_address== ""){
             
            return res.send({
                errCode:1,
                errMessage:"Vui lòng nhập địa chỉ cụ thể"
            }) 
        }
        let data_value = {}
        if(data.tenXaPhuong == "koCo"){
            let diaChi = data.detai_address +", "+data.tenQuanHuyen+", "+data.tenTinh
            data_value= {
                id_member:id_member,
                hoTen:data.name,
                soDienThoai:data.phone,
                diaChi:diaChi
            }
        }else{
            let diaChi = data.detai_address +", "+data.tenXaPhuong+", "+data.tenQuanHuyen+", "+data.tenTinh
            data_value= {
                id_member:id_member,
                hoTen:data.name,
                soDienThoai:data.phone,
                diaChi:diaChi
            }
        }
  
           
        let postAddress = await addressServiceAPP.postDataAddressService(data_value);
        return res.send(postAddress) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let delateAddressMember = async (req, res) => {
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIDMember.checkIdUser(req, res,cookie)
        var id_address = req.query.id_address;
        let data = {
            id:id_address,
            id_member:id_member
        }
        let deleteAddress = await addressServiceAPP.deleteAddressService(data);
       
        return res.send(deleteAddress) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let setStatusAddress = async (req, res) => {
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIDMember.checkIdUser(req, res,cookie)
        var id_address = req.query.id_address;
        let data = {
            id:id_address,
            id_member:id_member
        }
        let deleteAddress = await addressServiceAPP.EditStatusAddressService(data);
       
        return res.send(deleteAddress) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let listOneAddressMember = async (req, res) => {
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIDMember.checkIdUser(req, res,cookie)
       
        let getAddress = await addressServiceAPP.getItemAddressInIdMemberService(id_member);
       
        return res.send(getAddress) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};

      

module.exports = {
    getDiaChimember:getDiaChimember,
    handleItemListAddess:handleItemListAddess,
    addDiaChiMemmber:addDiaChiMemmber,
    delateAddressMember:delateAddressMember,
    setStatusAddress:setStatusAddress,
    listOneAddressMember:listOneAddressMember
}