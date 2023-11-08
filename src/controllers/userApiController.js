import userApiSeviece from "../services/userApiSevice";

const listUs = async (req, res) => {
    try {
        let data = await userApiSeviece.getAllUser();
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // Error code
            DT: data.DT,
        })
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