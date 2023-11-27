const { QueryTypes } = require('sequelize');

import sequelize from "../../config/queryDatabse"

let handleGetUserCart = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let checkUser = await checkUserMember(id)
            let User = await db.Members.findOne({
                where: {id:id }
            })
            if(checkUser){
                
               let getCart = await db.Carts.findAll({
                    where: {idUser: id,
                        status : 0
                    },
                    order: [
                        ['id', 'ASC'],
                       
                    ]
                })
                
               if(User){
                resolve({
                    errCode: 0,
                    errMessage :"List thành công",
                    Carts :getCart
                })
               }else{
                resolve({
                    errCode: 0,
                    errMessage :"User không tồn tại",
                    
                })
               }
                    
                   


                
            }else{
                resolve({
                    errCode: 1,
                    errMessage:"User không tồn tại",

                })
            }
          
        } catch (error) {
            reject(error);
        }
    })
}
let handleAddCart = (data)=>{

    return new Promise(async(resolve, reject)=>{
        try {
           let idSP = data.idSP;
           let 	idUsers = data.idUser;
           let check = checkProducts(idSP)
           
           let checkUser = checkUserMember(idUsers)
         
                let User = await db.Members.findOne({
                    where: {id:idUsers }
                })
                
                let dataProduct = await db.Products.findOne({
                    where: {id:idSP }
                })
                if(dataProduct&&User){
                    await db.Carts.create({
                        ipSanPham: dataProduct.id,
                        idUser: idUsers,
                        size: data.size,
                        soLuong: data.soLuong,
                        thanhTien: dataProduct.sale ==0?dataProduct.giaSanPham:(dataProduct.giaSanPham-(dataProduct.giaSanPham*dataProduct.sale/100)),
                        status: 0
                    })
                    resolve({
                        errCode: 0,
                        errMessage:"Đã thêm sản phẩm vào Giỏ hàng",
    
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage:"Sản phẩm hoặc user không tồn tại"
                    })
                }
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleDeleteCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let Cart = await  db.Carts.findOne({
            where: {id: id},
            
            
         });

         if(!Cart){
            resolve({
                errCode: 2,
                errMessage: 'giỏ hàng không tồn tại',
            })
           
         }else{
            await db.Carts.destroy({
                where: {id: id}
             })
             resolve({
                errCode:0,
                errMessage: 'Xóa thành công'+ Cart.id
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleUpdateCart = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
        
         let Cart = await  db.Carts.findOne({
            where: {id: data.id}, 
         });
         let idSP = Cart.ipSanPham
         let dataProduct = await db.Products.findOne({
            where: {id:idSP }
        })
         
         console.log(Cart);
         if(!Cart){
            resolve({
                errCode: 2,
                errMessage: 'giỏ hàng không tồn tại',
            })
           
         }else{
            await db.Carts.update(
                
                {
                    soLuong: data.soLuong,
                    thanhTien: dataProduct.sale ==0?dataProduct.giaSanPham *data.soLuong:(dataProduct.giaSanPham-(dataProduct.giaSanPham*dataProduct.sale/100))*data.soLuong,
                    size: data.size
                },
                {where: {id: data.id}}
             )
             resolve({
                errCode:0,
                errMessage: 'update thành công'+ Cart.id
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleCreateOrderCart = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {

            let idCart = [...data.idCart]
            let idUser = data.idUser
            
            let user = await db.Members.findOne({
                where : {id : idUser}
            })
            let tienTk = user.tienTk
            console.log(idCart.length)
            if(idCart.length>0){
                if(user){
                        await db.Orders.create({
                            idCart: data.idCart,
                            idUser: idUser,
                            tongTien: data.tongTien,
                            status: 0
                        })
                        await db.Carts.update(
                            {status: 1},
                            {
                            where: {idUser:idUser,
                                    status: 0
                                }
                            }
                        )
                        await db.Members.update(
                            {tienTk: tienTk - data.tongTien },
                            {
                            where: {id : idUser}
                            }
                        )
                        
                        resolve({
                            errCode:0,
                            errMessage: 'Đã đặt hàng thành công vui lòng chờ bên shop giao hàng'
                         })
                        
                   
                    
                }else{
                    resolve({
                        errCode:1,
                        errMessage: 'User không tồn tại'
                     })
                }
            }else{
                resolve({
                    errCode:3,
                    errMessage: 'Không có sản phẩm nào trong giỏ hàng'
                 })
            }
           
           
    
         
     
       
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleHuyOrderCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(id)
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 4},
                {where: {id: id}}
             )
             
             resolve({
                errCode:0,
                errMessage: 'update thành công'
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleChiTietOrderCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(id)
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
             resolve({
                errCode:0,
                errMessage: 'thành công',
                detailOrder: Order
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleDeleteOrderService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await  db.Orders.destroy(
                {
                    where: {id: id}
                }
            )
             resolve({

                errCode:0,
                errMessage: 'thành công',
               
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {

    handleGetUserCart:handleGetUserCart,
    handleAddCart:handleAddCart,
    handleDeleteCart:handleDeleteCart,
    handleUpdateCart:handleUpdateCart,
    handleCreateOrderCart:handleCreateOrderCart,
    handleHuyOrderCart:handleHuyOrderCart,
    handleChiTietOrderCart:handleChiTietOrderCart,
    handleDeleteOrderService:handleDeleteOrderService
    
}