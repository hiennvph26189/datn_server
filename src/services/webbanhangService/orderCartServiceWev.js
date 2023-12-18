
const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import bcrypt from 'bcryptjs';
import datetime from "./getdateService"
import { appendFile } from "fs";

const salt = bcrypt.genSaltSync(10);
let congSoLuongCartService = (id_member,cart_id)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member&&cart_id){
                const [getItemCart] = await sequelize.query(`
                SELECT 
               
                carts.id as cart_id,
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
                sizes ON sizes.id_sp = carts.ipSanPham 
                where carts.id = ${cart_id} and carts.idUser = ${id_member}  and carts.status = 0

                `, { type: QueryTypes.SELECT });
                if(getItemCart && getItemCart.soLuong <= getItemCart[getItemCart.size]){
                    if(getItemCart.soLuong == getItemCart[getItemCart.size]){
                        
                    
                        await sequelize.query(`
                            UPDATE carts
                            SET soLuong = soLuong , thanhTien = thanhTien
                            WHERE id = ${cart_id} and idUser = ${id_member}  and status = 0;
                            `, { type: QueryTypes.UPDATE });
                    
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                       
                     })
                    }else{
                        let tienSP = getItemCart.thanhTien / getItemCart.soLuong
                    
                        await sequelize.query(`
                            UPDATE carts
                            SET soLuong = soLuong + 1, thanhTien = thanhTien + ${tienSP}
                            WHERE id = ${cart_id} and idUser = ${id_member}  and status = 0;
                            `, { type: QueryTypes.UPDATE });
                    
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                       
                     })
                    }
                    
                }
                
            }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let truSoLuongCartService = (id_member,cart_id)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member&&cart_id){
                const [getItemCart] = await sequelize.query(`
                SELECT 
                carts.id as cart_id,
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
                sizes ON sizes.id_sp = carts.ipSanPham 
                where carts.id = ${cart_id} and carts.idUser = ${id_member}  and carts.status = 0

                `, { type: QueryTypes.SELECT });
                
                if(getItemCart && getItemCart[getItemCart.size] >0){

                    let tienSP = getItemCart.thanhTien / getItemCart.soLuong
                    let numberSoluong = getItemCart[getItemCart.size] - getItemCart.soLuong
                    if(getItemCart.soLuong >1){
                        await sequelize.query(`
                            UPDATE carts
                            SET soLuong = soLuong - 1, thanhTien = thanhTien - ${tienSP}
                            WHERE id = ${cart_id} and idUser = ${id_member}  and status = 0;
                            `, { type: QueryTypes.UPDATE });
                    
                            resolve({ 
                                errCode:0,
                                errMessage: 'Thành công',
                            
                            })
                    }else{
                        await sequelize.query(`
                            UPDATE carts
                            SET soLuong = soLuong , thanhTien = thanhTien
                            WHERE id = ${cart_id} and idUser = ${id_member}  and status = 0;
                            `, { type: QueryTypes.UPDATE });
                    
                            resolve({ 
                                errCode:0,
                                errMessage: 'Thành công',
                            
                            })
                    }
                        
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                       
                     })
                }
                
            }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let deleteCartService = (id_member,cart_id)=>{
    return new Promise(async(resolve, reject)=>{
       try {
            
            if(id_member&&cart_id){
                
                const [getItemCart] = await sequelize.query(`
                SELECT 
                *  
                FROM carts
                where id = ${parseInt(cart_id)} and idUser = ${id_member}  and status = 0

                `, { type: QueryTypes.SELECT });
                console.log(getItemCart,"id_member");
                if(getItemCart){
                    
                        await sequelize.query(`
                       
                            DELETE FROM carts
                            WHERE id = ${parseInt(cart_id)} and idUser = ${id_member}  and status = 0;
                            `, { type: QueryTypes.DELETE });
                    
                    resolve({ 
                        errCode:0,
                        errMessage: 'Xóa thành công',
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                       
                     })
                }
                
            }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let totalPriceCart = (id_member)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                const [getItemCart] = await sequelize.query(`
                SELECT 
                SUM(thanhTien) AS tongTien 
                FROM carts
                where idUser = ${id_member}  and status = 0
                `, { type: QueryTypes.SELECT });
                console.log(getItemCart);
                if(getItemCart.tongTien != null){
                    resolve({ 
                        errCode:0,
                        errMessage: 'OK',
                        tongTien:parseInt(getItemCart.tongTien)
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let updateSizeOrderService = (id_member,cart_id,size)=>{
    return new Promise(async(resolve, reject)=>{
       try {

        if(id_member&&cart_id,size){
            const [checkSoLuongSize] = await sequelize.query(`
            SELECT 
             ${size}
            FROM sizes
            where ${size} >0

            `, { type: QueryTypes.SELECT });
           
           
            if(checkSoLuongSize){
                
                const [getItemCart] = await sequelize.query(`
                SELECT 
                *  
                FROM carts
                where id = ${parseInt(cart_id)} and idUser = ${id_member}  and status = 0
    
                `, { type: QueryTypes.SELECT });
                if(getItemCart){
                    let tienSp = getItemCart.thanhTien / getItemCart.soLuong
                    await sequelize.query(`
                    UPDATE carts
                        SET soLuong = 1 , thanhTien = ${tienSp}, size = '${size}'
                        WHERE id = ${cart_id} and idUser = ${id_member}  and status = 0;
                    `, { type: QueryTypes.UPDATE });  
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                        
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Đơn hàng không tồn tại',
                        
                     })
                }
                 
                
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Đã hết số lượng size đã chọn',
                   
                 })
            }
            
        }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemDonDangXuLyService = (id_member,page)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where idUser = ${id_member}  and (status = 0 or status = 1)
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                    let limit = 3; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                const getArrOder = await sequelize.query(`
                SELECT 
                * 
                FROM orders
                where idUser = ${id_member}  and (status = 0 or status = 1) order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
                let totalPages = Math.ceil(totalCount[0].total / limit);
                if(getArrOder.length > 0){
                    let data = [];

                    for (const item of getArrOder) {
                        let arr_id_cart = JSON.parse(item.idCart);
                        let resultArray = [];

                        for (const id_cart of arr_id_cart) {
                            let [results] = await sequelize.query(`
                                SELECT 
                                    products.id as id_product,
                                    products.tenSp,
                                    products.giaSanPham,
                                    products.sale,
                                    products.image,
                                    carts.id as id_cart,
                                    carts.size,
                                    carts.soLuong,
                                    carts.thanhTien
                                FROM carts
                                INNER JOIN products ON carts.ipSanPham = products.id
                                WHERE carts.id = ${id_cart}
                            `, { type: QueryTypes.SELECT });

                            resultArray.push(results);
                        }

                        data.push({
                            arrOrder: item,
                            arr_sp_cart: resultArray
                        });
                    }
                    console.log(data);
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thất bại',
                        data:data,
                        totalPages:totalPages
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemDonHuyService = (id_member,page)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where idUser = ${id_member}  and (status = 4 or status = 5)
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                    let limit = 3; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                const getArrOder = await sequelize.query(`
                SELECT 
                * 
                FROM orders
                where idUser = ${id_member}  and (status = 4 or status = 5) order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
                let totalPages = Math.ceil(totalCount[0].total / limit);
                if(getArrOder.length > 0){
                    let data = [];

                    for (const item of getArrOder) {
                        let arr_id_cart = JSON.parse(item.idCart);
                        let resultArray = [];

                        for (const id_cart of arr_id_cart) {
                            let [results] = await sequelize.query(`
                                SELECT 
                                    products.id as id_product,
                                    products.tenSp,
                                    products.giaSanPham,
                                    products.sale,
                                    products.image,
                                    carts.id as id_cart,
                                    carts.size,
                                    carts.soLuong,
                                    carts.thanhTien
                                FROM carts
                                INNER JOIN products ON carts.ipSanPham = products.id
                                WHERE carts.id = ${id_cart}
                            `, { type: QueryTypes.SELECT });

                            resultArray.push(results);
                        }

                        data.push({
                            arrOrder: item,
                            arr_sp_cart: resultArray
                        });
                    }
                    console.log(data);
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thất bại',
                        data:data,
                        totalPages:totalPages
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemDonHoanService = (id_member,page)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where idUser = ${id_member}  and (status = 10 or status = 11)
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                    let limit = 3; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                const getArrOder = await sequelize.query(`
                SELECT 
                * 
                FROM orders
                where idUser = ${id_member}  and (status = 10 or status = 11) order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
                let totalPages = Math.ceil(totalCount[0].total / limit);
                if(getArrOder.length > 0){
                    let data = [];

                    for (const item of getArrOder) {
                        let arr_id_cart = JSON.parse(item.idCart);
                        let resultArray = [];

                        for (const id_cart of arr_id_cart) {
                            let [results] = await sequelize.query(`
                                SELECT 
                                    products.id as id_product,
                                    products.tenSp,
                                    products.giaSanPham,
                                    products.sale,
                                    products.image,
                                    carts.id as id_cart,
                                    carts.size,
                                    carts.soLuong,
                                    carts.thanhTien
                                FROM carts
                                INNER JOIN products ON carts.ipSanPham = products.id
                                WHERE carts.id = ${id_cart}
                            `, { type: QueryTypes.SELECT });

                            resultArray.push(results);
                        }

                        data.push({
                            arrOrder: item,
                            arr_sp_cart: resultArray
                        });
                    }
                    console.log(data);
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thất bại',
                        data:data,
                        totalPages:totalPages
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemDonDangGiaoService = (id_member,page)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where idUser = ${id_member}  and status = 2
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                    let limit = 3; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                const getArrOder = await sequelize.query(`
                SELECT 
                * 
                FROM orders
                where idUser = ${id_member}  and  status = 2 order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
                let totalPages = Math.ceil(totalCount[0].total / limit);
                if(getArrOder.length > 0){
                    let data = [];

                    for (const item of getArrOder) {
                        let arr_id_cart = JSON.parse(item.idCart);
                        let resultArray = [];

                        for (const id_cart of arr_id_cart) {
                            let [results] = await sequelize.query(`
                                SELECT 
                                    products.id as id_product,
                                    products.tenSp,
                                    products.giaSanPham,
                                    products.sale,
                                    products.image,
                                    carts.id as id_cart,
                                    carts.size,
                                    carts.soLuong,
                                    carts.thanhTien
                                FROM carts
                                INNER JOIN products ON carts.ipSanPham = products.id
                                WHERE carts.id = ${id_cart}
                            `, { type: QueryTypes.SELECT });

                            resultArray.push(results);
                        }

                        data.push({
                            arrOrder: item,
                            arr_sp_cart: resultArray
                        });
                    }
                    console.log(data);
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                        data:data,
                        totalPages:totalPages
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemDonGiaoThanhCongService = (id_member,page)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  orders where idUser = ${id_member}  and status = 3
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 3; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                const getArrOder = await sequelize.query(`
                SELECT 
                * 
                FROM orders
                where idUser = ${id_member}  and  status = 3 order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
                let totalPages = Math.ceil(totalCount[0].total / limit);
                if(getArrOder.length > 0){
                    let data = [];

                    for (const item of getArrOder) {
                        let arr_id_cart = JSON.parse(item.idCart);
                        let resultArray = [];

                        for (const id_cart of arr_id_cart) {
                            let [results] = await sequelize.query(`
                                SELECT 
                                    products.id as id_product,
                                    products.tenSp,
                                    products.giaSanPham,
                                    products.sale,
                                    products.image,
                                    carts.id as id_cart,
                                    carts.size,
                                    carts.soLuong,
                                    carts.thanhTien
                                FROM carts
                                INNER JOIN products ON carts.ipSanPham = products.id
                                WHERE carts.id = ${id_cart}
                            `, { type: QueryTypes.SELECT });

                            resultArray.push(results);
                        }

                        data.push({
                            arrOrder: item,
                            arr_sp_cart: resultArray
                        });
                    }
                    console.log(data);
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                        data:data,
                        totalPages:totalPages
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let itemOrderMemberService = (id_member,id_order)=>{
    return new Promise(async(resolve, reject)=>{
       try {

            if(id_member){
                const [getItemOrder] = await sequelize.query(`
                SELECT 
                orders.*,
                address.hoTen,
                address.soDienThoai,
                address.diaChi,
                thanhtoan.method,
                thanhtoan.payment_no
                
                FROM orders
                INNER JOIN 
                address ON address.id = orders.id_address
                INNER JOIN 
                thanhtoan ON thanhtoan.id_donhang = orders.id
                where orders.id = ${id_order} and 	orders.idUser = ${id_member}
                `, { type: QueryTypes.SELECT });
                let arrIDCarrt = JSON.parse(getItemOrder.idCart)
                let arrProduct = []
                for(const id_cart of arrIDCarrt){
                    let [itemProductCart] = await sequelize.query(`
                    SELECT 
                    products.id as id_product,
                    products.tenSp,
                    products.giaSanPham,
                    products.sale,
                    products.image,
                    carts.id as id_cart,
                    carts.size,
                    carts.soLuong,
                    carts.thanhTien
                    
                    FROM carts
                    INNER JOIN 
                        products ON carts.ipSanPham = products.id
                    
                    where carts.id = ${id_cart} 
                     `, { type: QueryTypes.SELECT });
                     arrProduct.push(itemProductCart)
                }
               
                if(getItemOrder){
                    resolve({ 
                        errCode:0,
                        errMessage: 'OK',
                        getItemOrder:getItemOrder,
                        arrProduct:arrProduct
                       
                     })
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        tongTien:0
                       
                     })
                } 
            }
            

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let countCartService = (id_member)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            if(id_member){
                const [count] = await sequelize.query(`
                SELECT COUNT(*) as total FROM  carts  where idUser = ${id_member} and status = 0
                    `, { type: QueryTypes.SELECT });
                if(count){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        count:count.total
                    })  
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'thất bại',
                        count:0
                    }) 
                }
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'thất bại',
                    count:0
                }) 
            }
            
                  
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    congSoLuongCartService:congSoLuongCartService,
    truSoLuongCartService:truSoLuongCartService,
    deleteCartService:deleteCartService,
    totalPriceCart:totalPriceCart,
    updateSizeOrderService:updateSizeOrderService,
    itemDonDangXuLyService:itemDonDangXuLyService,
    itemOrderMemberService:itemOrderMemberService,
    itemDonDangGiaoService:itemDonDangGiaoService,
    itemDonGiaoThanhCongService:itemDonGiaoThanhCongService,
    itemDonHuyService:itemDonHuyService,
    itemDonHoanService:itemDonHoanService,
    countCartService:countCartService

}