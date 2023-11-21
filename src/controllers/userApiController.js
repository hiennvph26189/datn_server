import userApiSeviece from "../services/userApiSevice";



const listUs = async (req, res) => {
    try {
        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiSeviece.getUserWithPagination(+page,+limit);
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // Error code
                DT: data.DT,
            })

          
        }else{
            let data = await userApiSeviece.getAllUser();
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // Error code
                DT: data.DT,
            })
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })

    }
}

const addUs = async(req, res) => {
    try {
        let data = req.body;
        console.log("dữ liệu đã thêm: ", data.lastName);
        let dulieu = await userApiSeviece.createNewUser(data);
        return res.status(200).json(dulieu)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }

}

const editUs = async(req, res) => {
    try {
        // let id = req.params.id;
        let data = req.body;
    let user = await userApiSeviece.updateUser(data);
    return res.status(200).json(user)
    // if (user.errCode == 1) {
    //     return res.send(user.errMessage)
    // } 
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }
}
    
const deleteUs = async(req, res) => {
    try {
        let data = req.body;
        let deleteCategory = await userApiSeviece.deleteUser(data);
        return res.status(200).json(deleteCategory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }

}

module.exports = {
    listUs: listUs, addUs: addUs, editUs: editUs, deleteUs: deleteUs,
}