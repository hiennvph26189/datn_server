import db from "../../models/index";
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import dateTime  from "../webbanhangService/getdateService"
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
           
            if(idCart.length>0){
                if(user){
                    if(tienTk> 0 &&tienTk >= data.tongTien){
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
                            errMessage: 'Tiền trong tài khoản của bạn không đủ'
                         })
                    }
                       
                        
                   
                    
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
let handleGetAllOrder = (status,page)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            if(status =="All"){
                let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  orders where id_address	> 0 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
               
                    let limit = 20; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    
                const Order = await sequelize.query(`
                SELECT 
                orders.*,
                address.hoTen,
                address.soDienThoai,
                address.diaChi
                FROM orders
                INNER JOIN 
                address ON orders.id_address = address.id
                order by orders.id DESC limit ${limit} offset ${offset}
                 `, {
                    
                    type: Sequelize.QueryTypes.SELECT,
                  
                  });
                  let totalPages = Math.ceil(totalCount[0].total / limit);
               
                 let getCarts = await db.Carts.findAll({
                    where: {
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
        
                 if(!Order){
                    resolve({
                        errCode: 2,
                        errMessage: 'đơn hàng không tồn tại',
                    })
                   
                 }else{
                     resolve({
                        errCode:0,
                        errMessage: 'thành công',
                        getAllOrder: Order,
                        getCarts: getCarts,
                        totalCount:totalPages
                     })
                 }
            }else{
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where id_address	> 0 and status = ${status}
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                
                let limit = 20; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                let Order = []
                if(status == 0){
                    Order = await sequelize.query(`
                    SELECT 
                    orders.*,
                    address.hoTen,
                    address.soDienThoai,
                    address.diaChi
                    FROM orders
                    INNER JOIN 
                    address ON orders.id_address = address.id
                    where orders.status = ${status}
                    order by orders.id ASC limit ${limit} offset ${offset}
                    `, {
                        
                    type: Sequelize.QueryTypes.SELECT,
                  
                  });
                }else{
                    Order = await sequelize.query(`
                    SELECT 
                    orders.*,
                    address.hoTen,
                    address.soDienThoai,
                    address.diaChi
                    FROM orders
                    INNER JOIN 
                    address ON orders.id_address = address.id
                    where orders.status = ${status}
                    order by orders.id DESC limit ${limit} offset ${offset}
                    `, {
                        
                    type: Sequelize.QueryTypes.SELECT,
                  
                  });
                }
           
                 
                  let totalPages = Math.ceil(totalCount[0].total / limit);
                 let getCarts = await db.Carts.findAll({
                    where: {
                            
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
        
                 if(!Order){
                    resolve({
                        errCode: 2,
                        errMessage: 'đơn hàng không tồn tại',
                    })
                   
                 }else{
                     resolve({
                        errCode:0,
                        errMessage: 'thành công',
                        getAllOrder: Order,
                        getCarts: getCarts,
                        totalCount:totalPages
                     })
                 }

            }
         
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleHuyDonThanhCongService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        let id = data.id;
        // let arrCarts =JSON.parse(data.arrCarts) ;
        // let arrCartsData = [];
        let idUser = data.idUser;
        let tongTien = data.tongTien
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });
         let user = await  db.Members.findOne({
            where: {id: idUser},  
         });
        //  let arrCartsItem = await db.Carts.findAll()
        //  arrCartsItem.map((arrCartsItem) =>{
        //     arrCarts.map((item)=>{
        //         if(arrCartsItem.id === item){
        //             arrCartsData.push(arrCartsItem)
        //         }
        //     })
        //  })
         let soDu = user.tienTk
        //  let arrProduct =  await db.Products.findAll()
         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 5},
                {where: {id: id}}
             )
             await db.Members.update(
                {tienTk: soDu+tongTien},
                {where: {id: idUser}}
             )
            //  arrCartsData.map((itemArrCartsData)=>{
            //     arrProduct.map((productArr)=>{
            //         if(itemArrCartsData.ipSanPham===productArr.id){
            //              db.Products.update(
            //                 {soluong: arrProduct.soLuong-arrCartsData.soLuong},
            //                 {where: {id: itemArrCartsData.ipSanPham}}
            //              )
            //         }
            //     })
            //  })
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
let handleCheckOrderService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            let idUser = data.idUser
            let id = data.id
            let arrCartsItem = await db.Carts.findAll({
                where: {idUser:idUser}
            })
            let Order = await  db.Orders.findOne({
                where: {id: id},  
            });
            let arrCartsUser = []
            let arrProduct =  await db.Products.findAll()
            let arrCarts = JSON.parse(data.arrCarts)
            
            arrCarts.map((item)=>{
                arrCartsItem.map((arrCartsItems)=>{
                    if(arrCartsItems.id === item){
                        arrCartsUser.push(arrCartsItems)
                    }
                })
            })
          
            
         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 2},
                {where: {id: id}}
             )
            arrCartsUser.map(async(item)=>{
                await db.Carts.update(
                    {status:2
                        
                    },
                    {where: {id: item.id}}
                )
                arrProduct.map( async(products)=>{
                    if(item.ipSanPham === products.id){
                        await db.Products.update(
                            {soLuong: products.soLuong - item.soLuong,
                            luotMua: products.luotMua + item.soLuong
                            },
                            {where: {id: item.ipSanPham}}
                         )
                    }
                })
            })
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
let handleGiaoDonService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            console.log(data);
            let id = data.id
            let status = data.status
            let Order = await  db.Orders.findOne({
                where: {id: id},  
            });
            console.log();
         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            if(Order.status == 0 || Order.status == 10){
                let arrIdCart = JSON.parse(Order.idCart)
                let arrCheck = []
                let arrUpdate = []
                let arrTenSpFalse = ""
                for (const item of arrIdCart) {
                    const [results] = await sequelize.query(`
                    SELECT 
                    products.id as id_product,
                    products.tenSp,
                    products.giaSanPham,
                    products.sale,
                    products.image,
                    carts.id as id_cart,
                    carts.size,
                    carts.soLuong,
                    carts.thanhTien,
                    sizes.id as id_size,
                    sizes.S,
                    sizes.M,
                    sizes.L,
                    sizes.XL,
                    sizes.XXL
                    FROM carts
                    INNER JOIN 
                        products ON carts.ipSanPham = products.id
                    INNER JOIN 
                    sizes ON sizes.id_sp = products.id
                    where carts.id = ${item} 
                    `, { type: QueryTypes.SELECT });
                        if(results.soLuong <= results[results.size]){
                            arrCheck.push(true)
                        }else{
                            arrCheck.push(false)
                            arrTenSpFalse = arrTenSpFalse + results.tenSp + " (" +"x"+ results.soLuong  + " size: " + results. size+ ") \n"
                        }
                        arrUpdate.push({
                            id_size:results.id_size,
                            id_sp: results.id_product,
                            size:results.size,
                            soLuong: results.soLuong
                        })
                  }
                
                  const allTrue = arrCheck.every(value => value === true)
                 
                  if(allTrue){
                        if(arrUpdate.length > 0){
                            arrUpdate.map(async value =>{
                                await sequelize.query(`
                                UPDATE sizes
                                SET ${value.size} = ${value.size} - ${value.soLuong}
                                WHERE id = ${value.id_size};
                                `, { type: QueryTypes.UPDATE });

                                await sequelize.query(`
                                UPDATE products
                                SET soLuong = soLuong - ${value.soLuong}
                                WHERE id = ${value.id_sp};
                                `, { type: QueryTypes.UPDATE });
                            })
                                await sequelize.query(`
                                UPDATE orders
                                SET status = 1
                                WHERE id = ${Order.id}
                                `, { type: QueryTypes.UPDATE});
                                resolve({ 
                                    errCode:0,
                                    errMessage: 'thành công',
                                    
                                })
                                }else{
                                    resolve({ 
                                        errCode:1,
                                        errMessage: 'Thất bại',
                                        
                                    }) 
                                }
                               
                  }else{
                        await sequelize.query(`
                        UPDATE orders
                        SET status = 10, note_order = '${arrTenSpFalse}'
                        WHERE id = ${Order.id} and status =0
                        `, { type: QueryTypes.UPDATE});
                        resolve({ 
                            errCode:2,
                            errMessage: 'Sản phẩm đã chuyển sang đơn đang bị lỗi',
                            
                        })
                  }
            }else if(Order.status == 4){
                resolve({ 
                    errCode:4,
                    errMessage: 'Sản phẩm đã được hủy',
                    
                })
            }else{
                await db.Orders.update(
                {status: status},
                {where: {id: id}}
                )
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    
                })
            }
            
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleThongKeOrdersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            
            if(data&& parseInt(data.key) ===2){
                let tuNgay = data.tuNgay
                let denNgay = data.denNgay
               
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice
                FROM carts
                Where status = 1 And updatedAt BETWEEN '${tuNgay}' AND '${denNgay}'
                
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }else if(parseInt(data.key) === 0){
                console.log(data,"adk;fak");
                let thang = data.thang
                let nam = data.nam
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice, status
                FROM carts
                Where status = 1 And YEAR(updatedAt) = ${parseInt(nam)} AND MONTH(updatedAt) = ${parseInt(thang)}
               
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
                console.log(result)
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }else if(parseInt(data.key) === 1){
               
                let ngay = data.ngay
               
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice, status
                FROM carts
                Where status = 1 And DATE(updatedAt) = '${ngay}'
                
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }
               
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let updateMaVanDonOrderService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            console.log(data,"kd;akd;ka");
        let id_order = data.id_order; 
        let mavandon = data.mavandon; 
        let date = dateTime.getdate(); 
        let Order = await  db.Orders.findOne({
            where: {id: id_order},  
         });
        
         if(!Order){

            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            let arrCarts = JSON.parse(Order.idCart)
            arrCarts.map(async(item,index)=>{
              let  letItemCart = await sequelize.query(`
                SELECT *
                FROM carts
                Where id = ${item}
                `, { type: QueryTypes.SELECT });
                console.log(letItemCart, "ask;kd");
                if(letItemCart.length >0){
                    await sequelize.query(`
                    UPDATE orders
                    SET mavandon = '${mavandon}' , updatedAt = '${date}',status = 2
                    WHERE id = ${id_order} 
                    `, { type: QueryTypes.UPDATE });

                    await sequelize.query(`
                    UPDATE products
                    SET luotMua = luotMua + ${letItemCart[0].soLuong}
                    WHERE id = ${letItemCart[0].ipSanPham } ;
                    `, { type: QueryTypes.UPDATE });
                    resolve({
                        errCode:0,
                        errMessage: 'thành công',
                       
                     })
                }else{
                    resolve({
                        errCode:1,
                        errMessage: 'Thất bại',
                       
                     })
                }
                
                
            })
             
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handHoanDonOrderService = async(data)=>{
   
    
    return new Promise(async(resolve, reject)=>{
            try {
                let id =  data.id_order;
                let metthod = data.method;
             
                
                    let Order = await  db.Orders.findOne({
                        where: {id: id},  
                     });
            
                     if(!Order){
                        resolve({
                            errCode: 2,
                            errMessage: 'đơn hàng không tồn tại',
                        })
                       
                     }else{ 
                        let status_order =  Order.status
                        let arr_id_cart = JSON.parse(Order.idCart) 
                        if(metthod == "TK"){
                            let id_member = Order.idUser
                            let price_order = Order.tongTien
                            if(status_order == 10){
                                await db.Orders.update(
                                    {status: 11},
                                    {where: {id: id}}
                                )
                            }else if(status_order == 4){
                                await db.Orders.update(
                                    {status: 5},
                                    {where: {id: id}}
                                )
                            }
                            for(const id_cart of arr_id_cart){
                                await sequelize.query(`
                                    UPDATE carts
                                    SET status = 2
                                    WHERE id = ${id_cart} ;
                                    `, { type: QueryTypes.UPDATE });
                            }
                            await sequelize.query(`
                            UPDATE members
                            SET tienTk = tienTk + ${price_order}
                            WHERE 	id = ${id_member} ;
                            `, { type: QueryTypes.UPDATE });
                           
                            await sequelize.query(`
                            UPDATE thanhtoan
                            SET status = 2
                            WHERE 	id_donhang = ${id} ;
                            `, { type: QueryTypes.UPDATE });
                            resolve({
                                errCode:0,
                                errMessage: 'Đã hoàn tiền thành công, tiền đã được hoàn vào tài khoản của khách hàng'
                            })
                        }else{
                            if(status_order == 10){
                                await db.Orders.update(
                                    {status: 11},
                                    {where: {id: id}}
                                )
                            }else if(status_order ==4){
                                await db.Orders.update(
                                    {status: 5},
                                    {where: {id: id}}
                                )
                            }
                            for(const id_cart of arr_id_cart){
                                await sequelize.query(`
                                    UPDATE carts
                                    SET status = 2
                                    WHERE id = ${id_cart} ;
                                    `, { type: QueryTypes.UPDATE });
                            }
                                await sequelize.query(`
                                UPDATE thanhtoan
                                SET status = 2
                                WHERE	id_donhang = ${id} ;
                                `, { type: QueryTypes.UPDATE });
                            resolve({
                                errCode:0,
                                errMessage: 'Đã hoàn tiền thành công, hãy kiểm tra xem bạn đã hoàn lại tiền cho khách hàng hay chưa'
                            })
                        }
                        
                     }
                
            } catch (error) {
                reject(error)
            }
    })
}
module.exports  = {
    handleAddCart:handleAddCart,
    handleDeleteCart:handleDeleteCart,
    handleGetUserCart:handleGetUserCart,
    handleUpdateCart:handleUpdateCart,
    handleCreateOrderCart:handleCreateOrderCart,
    handleLichSuOrderCart:handleLichSuOrderCart,
    handleHuyOrderCart:handleHuyOrderCart,
    handleChiTietOrderCart:handleChiTietOrderCart,
    handleGetAllOrder:handleGetAllOrder,
    handleHuyDonThanhCongService:handleHuyDonThanhCongService,
    handleDeleteOrderService:handleDeleteOrderService,
    handleCheckOrderService:handleCheckOrderService,
    handleGiaoDonService:handleGiaoDonService,
    handleThongKeOrdersService:handleThongKeOrdersService,
    updateMaVanDonOrderService:updateMaVanDonOrderService,
    handHoanDonOrderService:handHoanDonOrderService
    
}