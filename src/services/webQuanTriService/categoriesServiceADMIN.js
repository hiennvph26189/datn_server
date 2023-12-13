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

let AddCategoriesService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
                await db.Categories.create({
                    name: data.name,
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                    
                })
            
           
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let deleteCategory = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let categories = await  db.Categories.findOne({
            where: {id: id},
            
            
         });
         if(!categories){
            resolve({
                errCode: 2,
                errMessage: 'danh sách sản phẩm không tồn tại',
            })
           
         }else{
            await db.Categories.destroy({
                where: {id: id}
             })
             resolve({
                errCode:0,
                errMessage: 'Xóa thành công'
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let editCategoryService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        if(!data.id){
            resolve({
                errCode: 2,
                errMessage:"Category không tồn tại"
            })
        }
        let categories = await  db.Categories.findOne({
            where: {id: data.id},
            raw: false

           
         });

         
         if(categories){
            categories.name= data.name,
           
            await categories.save()
           
                resolve({
                    errCode: 0,
                    errMessage:"Sửa thành công"
                })
           
         }else{
            resolve({
                errCode: 1,
                errMessage:"User không tồn tại"
            })
         }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let getCategoryWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  categories 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 10; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  categories = await sequelize.query(`
                    SELECT * FROM  categories  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                    if(categories.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            categories:categories,
                            nameCategories: "Loai san pham",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}
module.exports  = {
    handleGetAllCategories: handleGetAllCategories,
    AddCategoriesService:AddCategoriesService,
    deleteCategory:deleteCategory,
    editCategoryService:editCategoryService,
    getCategoryWithPagination:getCategoryWithPagination,
    
}