

let contactADMIN =async (req,res)=>{
    
    try {
        // let getCategoryProducts = await menuService.getDanhSachSanPhamIdService(id,page)
        return res.render('homepages.ejs',{
           
            data2: JSON.stringify(data2)
        }) 
    } catch (e) {
        console.log(e);
    }
    
}
module.exports = {
    contactADMIN: contactADMIN,
  
}