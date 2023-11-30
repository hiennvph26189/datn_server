import db from "../../models/index";
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"
const Op = require('sequelize').Op;
let checkProducts = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            
            let Products = await db.Products.findOne({
                where: {id: id}
            })
            
            if (Products) {
                resolve(true)
            }else{
                
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserMember = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            
            let user = await db.Members.findOne({
                where: {id: id}
            })
            if (user) {
                resolve(true)
            }else{
                
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let postDataOrder9PayService = (data,arrTenSp,data_9pay)=>{

    return new Promise(async(resolve, reject)=>{
        try {

            let idCart = [...data.idCart]
            let idUser = data.idUser
            
            let user = await db.Members.findOne({
                where : {id : idUser}
            })
          
            let date = datetime.getdate()


            if(idCart.length>0){
                if(user){
                  let oder_id =     await db.Orders.create({
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
                       if(oder_id.id){
                          console.log(oder_id.id)
                          await sequelize.query(`
                          INSERT INTO thanhtoan (id_donhang, id_member, card_name, payment_no,invoice_no,amount,description,card_brand,card_number,method,status,created_at)
                          VALUES (${oder_id.id}, ${idUser}, "${data_9pay.card_info.card_name}", "${data_9pay.payment_no}","${data_9pay.invoice_no}","${data_9pay.amount}","${arrTenSp}","${data_9pay.card_info.card_brand}","${data_9pay.card_info.card_number}","${data_9pay.method}",1,"${date}");
                          `, { type: QueryTypes.INSERT });
                       }
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


let handleLichSuOrderCart = (id)=>{
    
    return new Promise(async (resolve, reject)=>{
        try {
            let checkUser = await checkUserMember(id)
            let User = await db.Members.findOne({
                where: {id:id }
            })
            if(checkUser){
                
               let getOrders = await db.Orders.findAll({
                    where: {idUser: id,
                       [Op.or]: [
                            { status: 0 },
                            { status: 1 }
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                }) 
                let getAllOrder = await db.Orders.findAll({
                    where: {idUser: id,
                       [Op.or]: [
                            { status: 0 },
                            { status: 1 },
                            { status: 2 },
                            { status: 3 },
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getDaDangGiao = await db.Orders.findAll({
                    where: {idUser: id,
                        status : 2
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getCarts = await db.Carts.findAll({
                    where: {idUser: id,
                        [Op.or]: [
                            { status: 1 },
                            { status: 2 },
                            { status: 3 }
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                 let getDaGiaoThanhCong = await db.Orders.findAll({
                    where: {idUser: id,
                        status : 3
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getDonHuy = await db.Orders.findAll({
                    where: {idUser: id,
                        [Op.or]: [
                            { status: 4 },
                            { status: 5 }
                          ]
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getAllProducts = await db.Products.findAll()
                
               if(User){
                resolve({
                    errCode: 0,
                    errMessage :"List thành công",
                    getOrders :getOrders,
                    getCarts:getCarts,
                    getAllProducts:getAllProducts,
                    getDaGiaoThanhCong:getDaGiaoThanhCong,
                    getDaDangGiao:getDaDangGiao,
                    getDonHuy:getDonHuy,
                    getAllOrder:getAllOrder

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
let addCardProductsSezesServiceAPP = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            let id_product = data.id_product
            let id_member = data.id_member
            console.log(id_product)
            let getOneProduct = await sequelize.query(`
            SELECT * FROM  products where  id = ${id_product}
            `, { type: QueryTypes.SELECT });

         if(getOneProduct.length >0 ){
            let getOneSizes = await sequelize.query(`
            SELECT 
            CASE 
              WHEN S > 0 THEN 'S'
              WHEN M > 0 THEN 'M'
              WHEN L > 0 THEN 'L'
              WHEN XL > 0 THEN 'XL'
              WHEN XXL > 0 THEN 'XXL'
              ELSE NULL
            END AS size
          FROM sizes
          WHERE id_sp = ${id_product}
            `, { type: QueryTypes.SELECT });
            
            if(getOneSizes.length > 0){
                let size = getOneSizes[0].size
                if(size !=null){
                    let date = datetime.getdate()
                    let thanh_tien = getOneProduct[0].giaSanPham - ((getOneProduct[0].giaSanPham*getOneProduct[0].sale)/100)
                    await sequelize.query(`
                    INSERT INTO carts (ipSanPham, idUser, size, soLuong,thanhTien,status,createdAt)
                    VALUES (${id_product}, ${id_member}, "${size}", 1, ${thanh_tien},0, "${date}");
                    `, { type: QueryTypes.INSERT });
                    resolve({
                        errCode:0,
                        errMessage: 'thành công',
                       
                       
                     })
                }else{
                    resolve({
                        errCode:1,
                        errMessage: 'Xin lỗi sản phẩm đã hết hãng',
                       
                       
                     })
                }
                
                 
            }else{
                resolve({
                    errCode:1,
                    errMessage: 'Sản phẩm chưa có size',
                    
                   
                 })
            }
            
         }else{
            resolve({
                errCode:1,
                errMessage: 'Sản phẩm không tồn tại',
                data: {}
               
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
    handleDeleteOrderService:handleDeleteOrderService,
    postDataOrder9PayService:postDataOrder9PayService,
    handleLichSuOrderCart:handleLichSuOrderCart,
    addCardProductsSezesServiceAPP:addCardProductsSezesServiceAPP
  

}