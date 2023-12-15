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

            let tientk_member = user.tienTk
            if(idCart.length>0){
                if(user){
                       
                        let selectAddress  = await sequelize.query(`
                        SELECT 
                    *
                    FROM address
                    WHERE id_members  = ${idUser} and status = "MAC-DINH" 
                        `, { type: QueryTypes.SELECT });
                        let id_address = selectAddress[0].id
                        let oder_id =  await db.Orders.create({
                            idCart: data.idCart,
                            idUser: idUser,
                            tongTien: data.tongTien,
                            id_address	: id_address,
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
                let getDonHoan = await db.Orders.findAll({
                    where: {idUser: id,
                        [Op.or]: [
                            { status: 10 },
                            { status: 11 }
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
                    getAllOrder:getAllOrder,
                    getDonHoan:getDonHoan

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

            let idCart = JSON.parse(data.idCart)
            let idUser = data.idUser
            let date = datetime.getdate()
            let user = await db.Members.findOne({
                where : {id : idUser}
            })
            console.log(data, 'data');
            if(idCart.length>0){
                
           
                if(user){
                    let tienTk = user.tienTk
                  
                    if(tienTk >=0 && tienTk >= data.tongTien){
                        let [selectAddress]  = await sequelize.query(`
                            SELECT 
                        *
                        FROM address
                        WHERE id_members  = ${idUser} and status = "MAC-DINH" 
                            `, { type: QueryTypes.SELECT });
                    if(selectAddress){
                      let oder_id =  await db.Orders.create({
                            idCart: data.idCart,
                            idUser: idUser,
                            tongTien: data.tongTien,
                            id_address: selectAddress.id,
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
                        if(oder_id.id){
                         
                            await sequelize.query(`
                            INSERT INTO thanhtoan (id_donhang, id_member, card_name, payment_no,invoice_no,amount,description,card_brand,card_number,method,status,created_at)
                            VALUES (${oder_id.id}, ${idUser}, "${user.tenThanhVien}", "","","${data.tongTien}","Thanh toán bằng tiền trong tài khoản","tienTk","","TK",1,"${date}");
                            `, { type: QueryTypes.INSERT });
                         }
                        resolve({
                            errCode:0,
                            errMessage: 'Đã đặt hàng thành công vui lòng chờ bên shop giao hàng'
                         })
                    }else{
                        resolve({
                            errCode:1,
                            errMessage: 'Địa chỉ của bạn không tồn tại, vui lòng chọn địa chỉ khác'
                         })
                    }
                    }else{
                        resolve({
                            errCode:1,
                            errMessage: 'Số dư trong tài khoản không đủ'
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
            if(Order.status === 0){
                await db.Orders.update(
                    {status: 4},
                    {where: {id: id}}
                 )
                 
                 resolve({
                    errCode:0,
                    errMessage: 'update thành công'
                 })
            }else{
                resolve({
                    errCode:1,
                    errMessage: 'Đơn hàng của bạn đã được duyệt, bạn không thể hủy đơn hàng này'
                 })
            }
            
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
            let soLuong = data.soLuong
            
            let size_data = data.size
            let getOneProduct = await sequelize.query(`
            SELECT * FROM  products where  id = ${id_product} and status = 0
            `, { type: QueryTypes.SELECT });
            if(size_data == ""){
                   
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
                            let nameSize = getOneSizes[0].size
                            let getOnecart = await sequelize.query(`
                            SELECT 
                        *
                        FROM carts
                        WHERE ipSanPham = ${id_product} and idUser = ${id_member} and size = '${getOneSizes[0].size}' and status = 0
                            `, { type: QueryTypes.SELECT });
                            
                        if(getOnecart.length>0){
                            let soluongCart = getOnecart[0].soLuong
                            
                                let selectSize  = await sequelize.query(`
                                SELECT 
                            *
                            FROM sizes
                            WHERE id_sp  = ${id_product} 
                                `, { type: QueryTypes.SELECT });
                                let soluong_size_sp = selectSize[0][nameSize]
                            
                                let soLuongSize = parseInt(soluongCart) + parseInt(soLuong)
                            
                                if(soLuongSize > soluong_size_sp){
                                    resolve({
                                        errCode:1,
                                        errMessage: 'Đã quá số lượng size ',
                                    
                                    
                                    })
                               
                                }else{
                                    let price = getOnecart[0].thanhTien / getOnecart[0].soLuong
                                    await sequelize.query(`
                                    UPDATE carts
                                    SET soLuong = soLuong + 1,thanhTien=thanhTien+ ${price} 
                                    WHERE ipSanPham = ${id_product} and idUser = ${id_member} and size = '${getOneSizes[0].size}' and status = 0;
                                    `, { type: QueryTypes.UPDATE });
                                    resolve({
                                        errCode:0,
                                        errMessage: 'Thêm thành công',
                                    
                                    
                                    })
                                }
                        }else{

                                let date = datetime.getdate()
                                let thanh_tien = getOneProduct[0].giaSanPham - ((getOneProduct[0].giaSanPham*getOneProduct[0].sale)/100) 
                                console.log(thanh_tien);
                                await sequelize.query(`
                                INSERT INTO carts (ipSanPham, idUser, size, soLuong,thanhTien,status,createdAt)
                                VALUES (${id_product}, ${id_member}, "${size}", ${soLuong}, ${thanh_tien},0, "${date}");
                                `, { type: QueryTypes.INSERT });

                            resolve({
                                errCode:0,
                                errMessage: 'thành công',
                            
                            
                            })
                        }
                            
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
            }else{
               
                let getOnecart = await sequelize.query(`
                    SELECT 
                    *
                    FROM carts
                    WHERE ipSanPham = ${id_product} and idUser = ${id_member} and size = '${size_data}' and status = 0
                    `, { type: QueryTypes.SELECT });
                 
                   
                    
                    if(getOnecart.length >0){
                        let soluongCart = getOnecart[0].soLuong
                        let selectSize  = await sequelize.query(`
                                SELECT 
                            *
                            FROM sizes
                            WHERE id_sp  = ${id_product} 
                                `, { type: QueryTypes.SELECT });
                        let soluong_size_sp = selectSize[0][size_data]
                    
                        let soLuongSize = parseInt(soluongCart) + parseInt(soLuong)
                        
                        if(soLuongSize > soluong_size_sp){
                            resolve({
                                errCode:1,
                                errMessage: 'Đã quá số lượng size ',
                            
                            
                            })
                        }else{
                            await sequelize.query(`
                            UPDATE carts
                            SET soLuong = soLuong + ${soLuong}
                            WHERE ipSanPham = ${id_product} and idUser = ${id_member} and size = '${size_data}' and status = 0;
                            `, { type: QueryTypes.UPDATE });
                            resolve({
                                errCode:0,
                                errMessage: 'Thêm thành công',
                            
                            
                            })
                        }

                    }else{
                        let date = datetime.getdate()
                        console.log(getOneProduct);
                        let thanh_tien = (getOneProduct[0].giaSanPham - ((getOneProduct[0].giaSanPham*getOneProduct[0].sale)/100))*soLuong
                        await sequelize.query(`
                        INSERT INTO carts (ipSanPham, idUser, size, soLuong,thanhTien,status,createdAt)
                        VALUES (${id_product}, ${id_member}, "${size_data}", ${soLuong}, ${thanh_tien},0, "${date}");
                        `, { type: QueryTypes.INSERT });

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
let checkSoLuongSanPhamTheoSize = (data)=>{
    return new Promise(async(resolve, reject)=>{
        const t = await sequelize.transaction();
        try {
            
            const inputArray = JSON.parse(data.cartList)
              let tongTien = 0
              // Tạo một đối tượng để theo dõi tổng số lượng dựa trên id_sp và size
              const quantityMap = {};
              
              // Duyệt qua mảng ban đầu để tính tổng số lượng cho mỗi cặp id_sp và size
              inputArray.forEach(item => {
                tongTien += tongTien + item.thanhTien
                const key = `${item.id}_${item.ipSanPham}_${item.size}`;
                if (quantityMap[key] === undefined) {
                  quantityMap[key] = item.soLuong;
                } else {
                  quantityMap[key] += item.soLuong;
                }
              });
              let checkOrder = false
              // Tạo mảng mới dựa trên tổng số lượng đã tính toán
              const newArray = Object.entries(quantityMap).map(([key, totalQuantity]) => {
                const [id,ipSanPham, size] = key.split('_').map(part => isNaN(Number(part)) ? part : Number(part));
                return {
                    id,
                  ipSanPham,
                  size,
                  soLuong: totalQuantity
                };
              });
            
         
    
              for (const order of newArray) {
                const {id, ipSanPham, size, soLuong } = order;
                const [product] = await sequelize.query(`
                SELECT 
                products.id as id_product,
                products.tenSp,
                sizes.id as id_size,
                sizes.S,
                sizes.M,
                sizes.L,
                sizes.XL,
                sizes.XXL
                FROM products
              
                INNER JOIN 
                sizes ON sizes.id_sp = products.id
                where products.id = :ipSanPham FOR UPDATE
                 `, {
                    replacements: { ipSanPham },
                    type: Sequelize.QueryTypes.SELECT,
                    transaction: t
                  });
                  if (product && product[size] !== undefined) {
                    // Kiểm tra xem có đủ số lượng còn để đặt hàng không
                    if (soLuong <= product[size]) {
                      // Thực hiện đặt hàng
                      console.log(`Đặt hàng ${soLuong} sản phẩm ${product.tenSp} kích thước ${size}.`);
                    } else {
                        resolve({ success: false, message: `Không đủ hàng để đặt mua ${soLuong} sản phẩm ${product.tenSp} kích thước ${size}.` });
                        checkOrder = false;
                    }
                  } else {
                    console.log(`Sản phẩm không tồn tại hoặc kích thước không hợp lệ.`);
                    checkOrder = false;
                  }
          
              }
              
              await t.commit();

              // Trả về dữ liệu khi quá trình đặt hàng hoàn tất
              resolve({ success: true, message: 'Đặt hàng thành công!' });
           
        } catch (error) {
            await t.rollback();
             reject(error);
        }
         
         
     }) 
}
let resetCartServiceAPP = (data)=>{

    return new Promise(async(resolve, reject)=>{
        try {
            console.log(data);
            let idCart = JSON.parse(data.idCart)
            let idUser = data.idUser
           
            let user = await db.Members.findOne({
                where : {id : idUser}
            })
          
            let date = datetime.getdate()
            

            if(idCart.length>0){
                if(user){
                   
                      idCart.map(async(item)=>{
                       
                        let cartItem  = await sequelize.query(`
                            SELECT 
                                *
                                FROM carts
                                WHERE id  = ${item} 
                                    `, { type: QueryTypes.SELECT });
                            let size =  cartItem[0].size
                            let ipSanPham = cartItem[0].ipSanPham
                            let soLuong = cartItem[0].soLuong
                            await sequelize.query(
                                `UPDATE sizes SET ${size} = ${size} + :soLuong WHERE id_sp = :ipSanPham`,
                                {
                                    replacements: { soLuong,ipSanPham },
                                    type: Sequelize.QueryTypes.UPDATE,
                                    
                                }
                                );
                        })  
                        
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
    addCardProductsSezesServiceAPP:addCardProductsSezesServiceAPP,
    checkSoLuongSanPhamTheoSize:checkSoLuongSanPhamTheoSize,
    resetCartServiceAPP:resetCartServiceAPP
  

}