const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getCategoriesService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  data1 = await sequelize.query(`
            SELECT * FROM  categories 
                `, { type: QueryTypes.SELECT });
               
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data1
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getDanhSachSanPhamIdService = (id,page)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            
            if(parseInt(id)>0){
                let nameCategories =  await sequelize.query(`
            SELECT name FROM  categories where id = ${id} 
                `, { type: QueryTypes.SELECT });
           
            let totalCount = await sequelize.query(`
            SELECT COUNT(*) as total FROM  products where idDanhSach = ${id} 
                `, { type: QueryTypes.SELECT });
            let pageNumber = page;
            let limit = 6; // Số lượng sản phẩm trên mỗi trang
            let offset = (pageNumber - 1) * limit;
            let  products = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
            
            let totalPages = Math.ceil(totalCount[0].total / limit);
           
            if(products.length > 0 && nameCategories.length >0){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    products:products,
                    nameCategories: nameCategories[0].name,
                    totalCount:totalPages
                 })
            }
            }else{
                if(id=='san-pham-ban-chay'){
                    let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  products where luotMua >1 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 6; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by luotMua desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
           
                    if(products.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            products:products,
                            nameCategories: "Sản phẩm bán chạy nhất",
                            totalCount:totalPages
                        })
                    }   
                }else if(id=='san-pham-moi'){
                    let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  products where id > 0 order by id desc
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 9; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where id > 0   order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
           
                    if(products.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            products:products,
                            nameCategories: "Sản phẩm mới",
                            totalCount:totalPages
                        })
                    } 
                }else if(id == "san-pham-noi-bat"){
                    let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  products where hot = 1 order by id desc
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 9; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where hot = 1  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
           
                    if(products.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            products:products,
                            nameCategories: "Sản phẩm nổi bật",
                            totalCount:totalPages
                        })
                    } 
                }else if(id == "san-pham-khuyen-mai"){
                    let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  products where sale > 10 or sale = 10 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 6; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where sale > 10 or sale = 10 order by sale desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
           
                    if(products.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            products:products,
                            nameCategories: "Sản phẩm khuyến mại",
                            totalCount:totalPages
                        })
                    } 
                }
            }
            
                
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getSapXepDanhSachSanPhamIdService = (id,page,value)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let arrProducts = []
            if(parseInt(id)>0){
                let nameCategories =  await sequelize.query(`
                SELECT name FROM  categories where id = ${id} 
                    `, { type: QueryTypes.SELECT });
               
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where idDanhSach = ${id} 
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 6; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                if(value =="null"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by tenSp asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by tenSp desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua, (giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where idDanhSach = ${id} order by sale_price asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua, (giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where idDanhSach = ${id} order by sale_price desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }
               
                
                
                let totalPages = Math.ceil(totalCount[0].total / limit);
               
                if(arrProducts.length > 0 && nameCategories.length >0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        products:arrProducts,
                        nameCategories: nameCategories[0].name,
                        totalCount:totalPages
                     })
                }
            }if(id == "san-pham-ban-chay"){
                
                
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where luotMua >1 
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 6; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                if(value =="null"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by tenSp asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua  FROM  products where luotMua >1  order by tenSp desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua ,(giaSanPham-(giaSanPham*(sale/100))) AS sale_price FROM  products where luotMua >1  order by sale_price asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua,(giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where luotMua >1  order by sale_price desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by id asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }
               
                
                
                let totalPages = Math.ceil(totalCount[0].total / limit);
               
                if(arrProducts.length > 0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        products:arrProducts,
                        nameCategories: "Sản phẩm bán chạy",
                        totalCount:totalPages
                     })
                }
            }else if(id == "san-pham-moi"){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where id > 0 order by id desc
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 9; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                if(value =="null"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where id > 0  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where id > 0  order by tenSp asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua  FROM  products where id > 0  order by tenSp desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua ,(giaSanPham-(giaSanPham*(sale/100))) AS sale_price FROM  products where id > 0  order by sale_price asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua,(giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where id > 0  order by sale_price desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where id > 0  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where id > 0  order by id asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }
               
                
                
                let totalPages = Math.ceil(totalCount[0].total / limit);
               
                if(arrProducts.length > 0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        products:arrProducts,
                        nameCategories: "Sản phẩm mới",
                        totalCount:totalPages
                     })
                }
            }else if(id == "san-pham-noi-bat"){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where hot = 1 order by id desc
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 9; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                if(value =="null"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  hot = 1  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  hot = 1  order by tenSp asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua  FROM  products where  hot = 1  order by tenSp desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua ,(giaSanPham-(giaSanPham*(sale/100))) AS sale_price FROM  products where  hot = 1  order by sale_price asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua,(giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where  hot = 1  order by sale_price desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  hot = 1  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  hot = 1  order by id asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }
               
                
                
                let totalPages = Math.ceil(totalCount[0].total / limit);
               
                if(arrProducts.length > 0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        products:arrProducts,
                        nameCategories: "Sản phẩm mới",
                        totalCount:totalPages
                     })
                }
            }else if(id == "san-pham-khuyen-mai"){
                let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where sale > 10 or sale = 10 
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 9; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
                if(value =="null"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where sale > 10 or sale = 10  order by sale desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where sale > 10 or sale = 10  order by tenSp asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="alpha-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua  FROM  products where  sale > 10 or sale = 10  order by tenSp desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua ,(giaSanPham-(giaSanPham*(sale/100))) AS sale_price FROM  products where  sale > 10 or sale = 10  order by sale_price asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="price-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua,(giaSanPham-(giaSanPham*(sale/100)))  AS sale_price FROM  products where  sale > 10 or sale = 10  order by sale_price desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-desc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  sale > 10 or sale = 10  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }else if(value =="created-asc"){
                    let  products = await sequelize.query(`
                    SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where  sale > 10 or sale = 10  order by id asc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                        arrProducts = products
                }
               
                
                
                let totalPages = Math.ceil(totalCount[0].total / limit);
               
                if(arrProducts.length > 0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        products:arrProducts,
                        nameCategories: "Sản phẩm khuyến mại",
                        totalCount:totalPages
                     })
                }
            }
           
                
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let searchService = (key_search)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let  data = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua name FROM  products where  tenSp LIKE '${key_search}%' order by id DESC 
                `, { type: QueryTypes.SELECT });
               
            if(data.length > 0 && key_search !==""){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data
                 })
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Không có sản phẩm nào tồn tại',
                    data:[]
                 })
            }
               
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    getCategoriesService:getCategoriesService,   
    getDanhSachSanPhamIdService:getDanhSachSanPhamIdService,
    getSapXepDanhSachSanPhamIdService:getSapXepDanhSachSanPhamIdService,
    searchService:searchService
}