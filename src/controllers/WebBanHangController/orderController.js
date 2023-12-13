import orderServiceAPP from "../../services/appServices/orderServiceAPP";
import productsServicesAPP from "../../services/appServices/productsServicesAPP";
import orderCartServiceWev from "../../services/webbanhangService/orderCartServiceWev";
const jwt = require('jsonwebtoken');
require('dotenv').config();
let getConvertArrProduct = (arrData)=>{
    const newArray = arrData.map(item => {
      return {
        ...item,
        thanhTien: item.thanhTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        giaBanSale: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
      };
    }); 
    return newArray
  }
let checkIdUser = (req,res,cookie)=>{
   
        const secretKey = process.env.MY_SECRET_KEY 
        let id = 0
        jwt.verify(cookie, secretKey, (err, user) => {
            if (err) {
                console.log('Token verification failed');
              
            }
            req.user = user;
          
            id =  user.id
            
            });
            return id
}
let handleAddCartWeb = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        let id = checkIdUser(req,res,cookie)
        let data = req.body
        let data_order = {
            id_product: parseInt(data.id_product),
            id_member: parseInt(id),
            soLuong: parseInt(data.quantity),
            size: data.size
        }
       
        let order = await  orderServiceAPP.addCardProductsSezesServiceAPP(data_order)
        if(order.errCode == 0){
            return res.redirect('/don-hang');
        }
       
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let litsDonHangCart = async (req, res) => {
  
    try {
        // var cookie = req.cookies.accessToken;
        // let id = checkIdUser(req,res,cookie)
        // let data = req.body
        // let data_order = {
        //     id_product: parseInt(data.id_product),
        //     id_member: parseInt(id),
        //     soLuong: parseInt(data.quantity),
        //     size: data.size
        // }
       
        // let order = await  orderServiceAPP.addCardProductsSezesServiceAPP(data_order)
        return res.render("webBanHang/listGioHang.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let ajaxListDonHangCart = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let data_cart = await productsServicesAPP.listProductsCarrt(id_member)
        let newArrProducts = getConvertArrProduct(data_cart.dataCarrt)
        let arr_size = data_cart.data.sizes
        console.log(arr_size);
        return res.render("webBanHang/ajaxListDonHang.ejs",{
           data_cart: newArrProducts,
           arr_size: arr_size
        } )
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let congSoLuongCart = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let cart_id = req.query.id_cart
        let data_cart = await orderCartServiceWev.congSoLuongCartService(id_member,cart_id)
        return res.send(data_cart);
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let truSoLuongCart = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let cart_id = req.query.id_cart
        let data_cart = await orderCartServiceWev.truSoLuongCartService(id_member,cart_id)
        return res.send(data_cart);
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let deleteCart = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let cart_id = req.query.id_cart
        let data_cart = await orderCartServiceWev.deleteCartService(id_member,cart_id)
        return res.send(data_cart);
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};

module.exports = {
    handleAddCartWeb:handleAddCartWeb,
    litsDonHangCart:litsDonHangCart,
    ajaxListDonHangCart:ajaxListDonHangCart,
    congSoLuongCart:congSoLuongCart,
    truSoLuongCart:truSoLuongCart,
    deleteCart:deleteCart
}