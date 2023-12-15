
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
module.exports  = {
    congSoLuongCartService:congSoLuongCartService,
    truSoLuongCartService:truSoLuongCartService,
    deleteCartService:deleteCartService,
    totalPriceCart:totalPriceCart

}