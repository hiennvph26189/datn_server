const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"
let postLikeProductService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id_product = parseInt(data.id_product) 
            let id_member = parseInt(data.id_member)
            let date = datetime.getdate()
            let  oneProduct = await sequelize.query(`
            SELECT * FROM  products WHERE id = ${id_product}
                `, { type: QueryTypes.SELECT });
                // console.log(oneProduct);
             let  oneMember = await sequelize.query(`
                SELECT * FROM  members WHERE id = ${id_member}
                    `, { type: QueryTypes.SELECT });
                     if (oneProduct.length>0 && oneMember.length>0) {
                        await sequelize.query(`
                        INSERT INTO like_products (id_sp, id_members)
                        VALUES (${id_product}, ${id_member});
                        `, { type: QueryTypes.INSERT });
                        await sequelize.query(`
                        UPDATE products
                        SET luotTim = ${oneProduct[0].luotTim+1}, updatedAt = '${date}'
                        WHERE id=${id_product};
                            `, { type: QueryTypes.UPDATE });
                            resolve({ 
                                errCode:0,
                                errMessage: 'thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'sản phẩm không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let deleteLikeProductService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id = parseInt(data.id) 
            let id_product = parseInt(data.id_product) 
            let id_member = parseInt(data.id_member)
            let date = datetime.getdate()
            let  oneProduct = await sequelize.query(`
            SELECT * FROM  products WHERE id = ${id_product}
                `, { type: QueryTypes.SELECT });
                // console.log(oneProduct);
             let  oneMember = await sequelize.query(`
                SELECT * FROM  members WHERE id = ${id_member}
                    `, { type: QueryTypes.SELECT });
                    let  oneLikeProduct = await sequelize.query(`
                    SELECT * FROM  like_products WHERE id_sp = ${id_product} AND id_members = ${id_member}
                        `, { type: QueryTypes.SELECT });
                     if (oneLikeProduct.length>0) {
                        await sequelize.query(`
                        DELETE FROM like_products
                        WHERE id= ${id}
                        `, { type: QueryTypes.DELETE });
                        await sequelize.query(`
                        UPDATE products
                        SET luotTim = ${oneProduct[0].luotTim-1}, updatedAt = '${date}'
                        WHERE id=${id_product};
                            `, { type: QueryTypes.UPDATE });
                            resolve({ 
                                errCode:0,
                                errMessage: 'thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'sản phẩm không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let LikeProductServices = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
                SELECT *
                FROM like_products
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
                data: data
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handleGetOneLikeProductsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = parseInt(data.id)
            let id_product = parseInt(data.id_product)
            let id_member = parseInt(data.id_member)
            let date = datetime.getdate()
            let oneProduct = await sequelize.query(`
            SELECT * FROM  products WHERE id = ${id_product}
                `, { type: QueryTypes.SELECT });
            // console.log(oneProduct);
            let oneMember = await sequelize.query(`
                SELECT * FROM  members WHERE id = ${id_member}
                    `, { type: QueryTypes.SELECT });
            let oneLikeProduct = await sequelize.query(`
                    SELECT * FROM  like_products WHERE id_sp = ${id_product} AND id_members = ${id_member}
                        `, { type: QueryTypes.SELECT });
            if (oneLikeProduct.length > 0) {
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'sản phẩm không tồn tại ',
                })
            }

        } catch (error) {
            reject(error);
        }


    })
}
module.exports={
    postLikeProductService:postLikeProductService,
    deleteLikeProductService:deleteLikeProductService,
    LikeProductServices:LikeProductServices,
    handleGetOneLikeProductsService:handleGetOneLikeProductsService
}