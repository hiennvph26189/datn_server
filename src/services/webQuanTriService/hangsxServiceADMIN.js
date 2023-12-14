const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import dateTime from "../getDate";

let handleGetHangsxServices = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
                SELECT *
                FROM hangsx
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
let handleAddHangsxServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let name = data.name;
            let status = data.status;
            let date = dateTime.getdate();
             await sequelize.query(`
             INSERT INTO hangsx (name, status, createAt, updateAt)
             VALUES ('${name}', '${status}', '${date}', '${date}');
                `, { type: QueryTypes.INSERT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handlePutHangsxServices = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data.id)
        try {
            
            let selectIdHangsx = await sequelize.query(`
            SELECT *
            FROM hangsx
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });
            if (selectIdHangsx.length > 0) {
                let id = data.id;
                let name = data.name;
                let status = data.status;
                let date = dateTime.getdate();
                await sequelize.query(`
                 UPDATE hangsx
                 SET name = '${name}', status = '${status}', updateAt = '${date}'
                 WHERE id=${id};
                    `, { type: QueryTypes.UPDATE});

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'không tồn tại sản phẩm',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleDeleteHangsxServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let selectIdHangsx = await sequelize.query(`
            SELECT *
            FROM hangsx
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdHangsx.length > 0) {
                let id = data.id;
                await sequelize.query(`
                 DELETE FROM hangsx WHERE id=${id}
                    `, { type: QueryTypes.DELETE });
                console.log(id)

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'không tồn tại sản phẩm',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getHangsxWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  hangsx 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 10; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  hangsx = await sequelize.query(`
                    SELECT * FROM  hangsx  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                    if(hangsx.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            hangsx:hangsx,
                            nameHangsx: "Hang San Xuat",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}
module.exports  = {
    handleGetHangsxServices:handleGetHangsxServices,
    handleAddHangsxServices:handleAddHangsxServices,
    handlePutHangsxServices:handlePutHangsxServices,
    handleDeleteHangsxServices:handleDeleteHangsxServices,
    getHangsxWithPagination:getHangsxWithPagination,
    
}