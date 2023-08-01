import db from "../models/users"
let getAllUsers = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let users = await  db.spModel.find();
         resolve(users);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getOneProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let data = await  db.spModel.findOne({
            _id: id
         });
         resolve({
            errCode: 0,
            errCodeMessage: "Ok",
            data: data
         });
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getDeleteProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let data = await  db.spModel.findOne({
            _id: id
         });
         if(data){
            await  db.spModel.findByIdAndDelete({
                _id: id
            });
            resolve({
                errCode: 0,
                errCodeMessage: "Ok",
           
             });

         }
        
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let createNewProduct = (data,anhSp)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(data, anhSp){
                let addProduct = new db.spModel({
                    tenSp: data.tenSp,
                    loaiSp: data.loaiSp,
                    anhSp: anhSp,
                    giaSp: parseInt(data.giaSp),
                    status: parseInt(data.status),

                })
                await addProduct.save()
                let products = await  db.spModel.find();
                resolve({
                    errCode: 0,
                    errCodeMessage: "Thêm mới thành công",
                    products: products
                });
            }
        
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getEditProduct = (data,anhSp)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let product = await  db.spModel.findOne({
                _id: data.id
             });
            if(data){
               
                product.tenSp= data.tenSp,
                product.loaiSp= data.loaiSp,
                product.anhSp= anhSp,
                product.giaSp= parseInt(data.giaSp),
                product.status= parseInt(data.status),

              
                await product.save()
               
                resolve({
                    errCode: 0,
                    errCodeMessage: "Thêm mới thành công",
                   
                });
            }
        
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports = {
    getAllUsers:getAllUsers,
    createNewProduct:createNewProduct,
    getOneProduct:getOneProduct,
    getEditProduct:getEditProduct,
    getDeleteProduct:getDeleteProduct
}