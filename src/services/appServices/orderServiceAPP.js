import db from "../../models/index";
let postDataLienHeService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {

            let idCart = [...data.idCart]
            let idUser = data.idUser
            
            let user = await db.Members.findOne({
                where : {id : idUser}
            })

         
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
    postDataLienHeService:postDataLienHeService
}