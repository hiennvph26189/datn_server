const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import datetime from "./getdateService"
let postDataLienHeService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let name = data.name;
            let email = data.email;
            let contact = data.contact;
            let date = datetime.getdate()
            console.log(date)
            if(name&&email&&contact){
                await sequelize.query(`
                INSERT INTO contact (name, email, comment, createdAt)
                VALUES ('${name}', "${email}", "${contact}", "${date}");
                `, { type: QueryTypes.INSERT });
               
               
            resolve({ 
                errCode:1,
                errMessage: 'Bạn đã gửi thành công, chúng tôi sẽ phản hồi lại vào Email của bạn',
               
             })
            }else{
                resolve({ 
                    errCode:0,
                    errMessage: 'Gửi thất bại',
                   
                 })
            }
            
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    postDataLienHeService:postDataLienHeService

}