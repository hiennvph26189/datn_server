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

            console.log(">>>checkdata: ", 'page = ', page, 'limit =',limit)
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

const addUs = (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }

}

const editUs = (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }
}

const deleteUs = (req, res) => {
    try {

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