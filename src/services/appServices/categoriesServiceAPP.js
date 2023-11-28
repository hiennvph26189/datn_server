import db from "../../models/index";

let handleGetAllCategories = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = {}
            let Roleid = await db.Categories.findAll();
            res.errCode = 0;
            res.errMessage = "OK",
            res.data = Roleid;
            resolve(res)
      
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleGetAllCategories: handleGetAllCategories,
}
