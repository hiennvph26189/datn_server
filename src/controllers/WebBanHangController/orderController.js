import orderServiceAPP from "../../services/appServices/orderServiceAPP";
import productsServicesAPP from "../../services/appServices/productsServicesAPP";
import orderCartServiceWev from "../../services/webbanhangService/orderCartServiceWev";
import addressServiceAPP from "../../services/appServices/addressServiceAPP";
import axios from "axios";
const moment = require('moment-timezone');
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
let getConvertArrProductCart = (arrData)=>{
    const newArray = arrData.map(item => {
      return {
        ...item,
        
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
        let total_price_cart = await orderCartServiceWev.totalPriceCart(id_member)
        let tongTien = 0
        if(total_price_cart.errCode == 0){
            console.log(total_price_cart);
            if(total_price_cart.tongTien < 0){
                tongTien = 0
            }else{
                tongTien = total_price_cart.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            }
             
        }else{
            tongTien = 0
        }
        
        let newArrProducts = getConvertArrProduct(data_cart.dataCarrt)
        let arr_size = data_cart.data.sizes
       
        return res.render("webBanHang/ajaxListDonHang.ejs",{
           data_cart: newArrProducts,
           arr_size: arr_size,
           tongTien:tongTien
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
let updateSizeOrder = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let cart_id = req.query.id_cart
        let size = req.query.size
        let data_cart = await orderCartServiceWev.updateSizeOrderService(id_member,cart_id,size)
        return res.send(data_cart);
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let listOrderThanhToan = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        
        let id_member = checkIdUser(req,res,cookie)
        let data_cart = await productsServicesAPP.listProductsCarrt(id_member)
        let total_price_cart = await orderCartServiceWev.totalPriceCart(id_member)
        let tongTien = 0
        if(total_price_cart.errCode == 0){
            console.log(total_price_cart);
            if(total_price_cart.tongTien < 0){
                tongTien = 0
            }else{
                tongTien = total_price_cart.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            }
             
        }else{
            tongTien = 0
        }
        
        let newArrProducts = getConvertArrProduct(data_cart.dataCarrt)
        let arr_size = data_cart.data.sizes
       
        return res.render("webBanHang/ajaxThanhToan.ejs",{
           data_cart: newArrProducts,
           arr_size: arr_size,
           tongTien:tongTien
        } )
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let postThanhToanWeb = async (req, res) => {
  
    try {
        var cookie = req.cookies.accessToken;
        let id_member = checkIdUser(req,res,cookie)
        let data = req.body.thanhtoan
        let data_cart = await productsServicesAPP.listProductsCarrt(id_member)
        let total_price_cart = await orderCartServiceWev.totalPriceCart(id_member)
        let tongTien = 0
        if(total_price_cart.errCode == 0){
            console.log(total_price_cart);
            if(total_price_cart.tongTien < 0){
                tongTien = 0
            }else{
                tongTien = total_price_cart.tongTien
            }
             
        }else{
            tongTien = 0
        }

        if(data){
            let getAddress = await addressServiceAPP.getItemAddressInIdMemberService(id_member);
            if(getAddress.errCode ==0){
                if(data == "tienTK"){
                    let arr_cart = data_cart.dataCarrt
                    let arr_id_cart = []
              
                    arr_cart.map((item,i)=>{
                        arr_id_cart.push(item.id_cart)
                    })
                    let data_order = {
                        idCart: JSON.stringify(arr_id_cart),
                        idUser:id_member,
                        tongTien:tongTien
                    }

                   let postTienTK = await orderServiceAPP.handleCreateOrderCart(data_order)
                    return res.send(postTienTK);
                }else{
                    let arr_cart = data_cart.dataCarrt
                    let arrTenSp = ""
                    arr_cart.map((item,i)=>{
                        arrTenSp += item.tenSp + ' (x' + item.soLuong + " size: " + item.size + ")" + "\n"
                    })
                   

                    let formdata = new FormData();
                    formdata.append("name", `${arrTenSp}`)
                    formdata.append("price", `${tongTien}`)
                    formdata.append("cookie_port", "webBanHang")
                    formdata.append("token", `${cookie}`)


                    axios({
                        url: "https://shopacc12312.000webhostapp.com/thongtinkhachhang.php",
                        method: 'POST',
                        data: formdata,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                        }
                    })
                        .then(function (response) {
                           
                            let url = response.data.redirectUrl
                            return res.send({
                                errCode:10,
                                errMessage:"sfafd",
                                url:url
                            })
                        })
                        .catch(function (error) {
                            console.log("error from image :", error);
                        })
                }
            }else{
                return res.send({
                    errCode:1,
                    errMessage:"Bạn chưa chọn địa chỉ nhận hàng",
                    getAddress:getAddress
                });
            }
        }else{
            return res.send({
                errCode:1,
                errMessage:"bạn chưa chọn thanh toán"
            });
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let checkThanhToan9Pay = async (req, res) => {
  
    try {
        var cookie = req.query.token;
        const buff = Buffer.from(req.query.result, 'base64');
        let cart_id = req.query.id_cart
        // decode buffer as UTF-8
        const str = buff.toString('utf-8');
        let data = JSON.parse(str)
        
        // let id_member = checkIdUser(req,res,cookie)
       
        let id_member = checkIdUser(req,res,cookie)  
       
        if(data.status == 5){
            let data_cart = await productsServicesAPP.listProductsCarrt(id_member)
            let arr_cart = []
            let arrID = []
            let arrName=""
            if(data_cart.errCode == 0){
                arr_cart = data_cart.dataCarrt
                arr_cart.map((item,i)=>{
                    arrID.push(item.id_cart)
                    arrName += item.tenSp + ' (x' + item.soLuong + " size: " + item.size + ")" + "\n"
                })
                let total_price_cart = await orderCartServiceWev.totalPriceCart(id_member)
                let tongTien = 0
                if(total_price_cart.errCode == 0){
                    console.log(total_price_cart);
                    if(total_price_cart.tongTien < 0){
                        tongTien = 0
                    }else{
                        tongTien = total_price_cart.tongTien
                    }
                     
                }else{
                    tongTien = 0
                }
                let data_order = {
                    idCart:JSON.stringify(arrID),
                    idUser:id_member,
                    tongTien:tongTien
                }
                let post9Pay = await orderServiceAPP.postDataOrder9PayService(data_order,arrName,data);
                if(post9Pay.errCode == 0){
                    return res.redirect('/')
                }else{
                    return res.redirect("/thanh-toan-that-bai");
                }
                
                
            }
         
        }else{
            return res.redirect("/thanh-toan-that-bai");
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'     
        })
     }
   
};
let thanhToanThatBai = async (req, res) => {
    
  
    try {
        
        return res.render('webBanHang/thanhToanThatBai.ejs',{data:{}})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let thanhToanThanhCong = async (req, res) => {
    
  
    try {
        
        return res.render('webBanHang/thanhToanThanhCong.ejs')
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let lichSuMuaHang = async (req, res) => {
    
  
    try {
        
        return res.render('webBanHang/lichSuMuaHang.ejs')
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let formatDate = (date)=>{
    const timeZone = 'Asia/Ho_Chi_Minh';
    console.log(date);
    const formattedDate = moment(date).tz(timeZone).format('DD/MM/YYYY HH:mm:ss')
    return formattedDate
  } 
  let itemDonDangXuLy = async (req, res) => {
    
  
    try {
        var cookie = req.cookies.accessToken;
        let page = req.query.page;
        let id_member = checkIdUser(req,res,cookie)
        let data = await orderCartServiceWev.itemDonDangXuLyService(id_member,page)
        let newArrConvert = []
        let arrData = data.data
        arrData.map((data,i) => {
            let newArrConvertProduct = getConvertArrProductCart(data.arr_sp_cart)
            newArrConvert.push(
                {arrOrder:{
                ...data.arrOrder,
                createdAt:formatDate(data.arrOrder.createdAt),
                updatedAt: formatDate(data.arrOrder.updatedAt),
                tongTien: data.arrOrder.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                },
                arr_sp_cart:newArrConvertProduct
            })
        })
       
        return res.render('webBanHang/itemDonDangXuLy.ejs',{data:newArrConvert, totalPages:data.totalPages, page:page})    
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
    deleteCart:deleteCart,
    checkIdUser:checkIdUser,
    updateSizeOrder:updateSizeOrder,
    listOrderThanhToan:listOrderThanhToan,
    postThanhToanWeb:postThanhToanWeb,
    checkThanhToan9Pay:checkThanhToan9Pay,
    thanhToanThatBai:thanhToanThatBai,
    thanhToanThanhCong:thanhToanThanhCong,
    lichSuMuaHang:lichSuMuaHang,
    itemDonDangXuLy:itemDonDangXuLy
}