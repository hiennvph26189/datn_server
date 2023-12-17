const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"
let postVoteStarProductServiceAPP = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
          
            if(data){
                let date = datetime.getdate()
                const getOneProduct = await sequelize.query(`
                INSERT INTO danhgia (id_sp, id_member, id_donhang, id_cart,vote,hoten,comment,status,createdAt)
                VALUES (${data.id_sp}, ${data.id_member},  ${data.id_donhang},${data.id_cart},${data.numberStar},'${data.hoTen}','${data.comment}',1,'${date}');
                `, { type: QueryTypes.INSERT });
                
                if (getOneProduct.length>0) {

                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                    
                    })   
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Sản phẩm không tồn tại',
                       
                    })   
                }
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Đánh giá thất bại',
                   
                })   
            }
           

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let checkVoteStartProductService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
          
            if(data){
               
                let date = datetime.getdate()
                let checkVote = await sequelize.query(`
                SELECT * FROM  danhgia where  id_cart = ${data.id_cart} and id_member = ${data.id_member} and id_donhang = ${data.id_donhang} and id_sp = ${data.id_sp}
                    `, { type: QueryTypes.SELECT });
                    console.log(checkVote);
                if(checkVote.length >0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                        numberStar:checkVote[0].vote
                    }) 
                }else{
                    resolve({ 
                        errCode:2,
                        errMessage: ' thất bại',
                        
                    }) 
                }
               
             
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Đánh giá thất bại',
                   
                })   
            }
           

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let getTotalStarProductService = (id_sp)=>{
    return new Promise(async(resolve, reject)=>{
        try {
          
            if(id_sp){
                let id = parseInt(id_sp)
                let checkVote = await sequelize.query(`
                SELECT * ,AVG(vote) AS averageStar, COUNT(*) AS rowCount FROM  danhgia where  id_sp = ${id} and status = 1
                    `, { type: QueryTypes.SELECT });
                
                let getAllVoteStar = await sequelize.query(`
                        SELECT 
                        danhgia.*, 
                        members.anhDaiDien,
                        members.tenThanhVien,
                        carts.size
                        FROM danhgia
                        INNER JOIN 
                        members ON danhgia.id_member = members.id
                        INNER JOIN 
                        carts ON danhgia.id_cart = carts.id
                        where danhgia.id_sp = ${id} and danhgia.status = 1 order by danhgia.id desc limit 5
                    `, { type: QueryTypes.SELECT }); 
                    
                const originalNumber = parseFloat(checkVote[0].averageStar); // Chuyển chuỗi thành số

                const roundedNumber = originalNumber.toFixed(1);
                if(checkVote.length >0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'Thành công',
                        tbStar:roundedNumber,
                        totalStar:checkVote[0].rowCount,
                        data: getAllVoteStar
                    }) 
                }else{
                    resolve({ 
                        errCode:2,
                        errMessage: ' thất bại',
                        
                    }) 
                }
               
             
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Đánh giá thất bại',
                   
                })   
            }
           

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let handleListThongKeDanhGiaSaoDetailService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
          
            if(data){
                let id_sp =  data.id_product;
                let star = data.star;
                if(star == 0){
                        let [totalStar] = await sequelize.query(`
                        SELECT COUNT(*) AS rowCount FROM  danhgia where  id_sp = ${id_sp} and status = 1
                        `, { type: QueryTypes.SELECT });
                        let getAllVoteStar = await sequelize.query(`
                        SELECT 
                        danhgia.*, 
                        members.anhDaiDien,
                        members.tenThanhVien,
                        carts.size
                        FROM danhgia
                        INNER JOIN 
                        members ON danhgia.id_member = members.id
                        INNER JOIN 
                        carts ON danhgia.id_cart = carts.id
                        where danhgia.id_sp = ${id_sp} and danhgia.status = 1 order by danhgia.id desc 
                    `, { type: QueryTypes.SELECT });
                        resolve({ 
                            errCode:0,
                            errMessage: 'Thành công',
                            totalStar:totalStar.rowCount,
                            data: getAllVoteStar
                        })
                }else{
                    let [totalStar] = await sequelize.query(`
                        SELECT COUNT(*) AS rowCount FROM  danhgia where  id_sp = ${id_sp} and status = 1 and vote = ${star}
                        `, { type: QueryTypes.SELECT });
                        let getAllVoteStar = await sequelize.query(`
                        SELECT 
                        danhgia.*, 
                        members.anhDaiDien,
                        members.tenThanhVien,
                        carts.size
                        FROM danhgia
                        INNER JOIN 
                        members ON danhgia.id_member = members.id
                        INNER JOIN 
                        carts ON danhgia.id_cart = carts.id
                        where danhgia.id_sp = ${id_sp} and danhgia.status = 1 and vote = ${star} order by danhgia.id desc 
                    `, { type: QueryTypes.SELECT });
                        resolve({ 
                            errCode:0,
                            errMessage: 'Thành công',
                            totalStar:totalStar.rowCount,
                            data: getAllVoteStar
                        })
                }
             
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Đánh giá thất bại',
                   
                })   
            }
           

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
module.exports  = {
    postVoteStarProductServiceAPP:postVoteStarProductServiceAPP,
    checkVoteStartProductService:checkVoteStartProductService,
    getTotalStarProductService:getTotalStarProductService,
    handleListThongKeDanhGiaSaoDetailService:handleListThongKeDanhGiaSaoDetailService
}