import loginRegisterService from '../services/loginRegisterService';

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'okok',
        data: 'test api'
    })
}
let handleRegister = async(req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing', //error message
                EC: '1', // Error code
                DT: '',
            })
        }

        if(req.body.password && req.body.password.length<4){
            return res.status(200).json({
                EM: 'Your Password must have more than 3 letter', //error message
                EC: '1', // Error code
                DT: '',
            })
        }

        //service create usser
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // Error code
            DT: '',
        })

    } catch (error) {
        return res.status(500).json({
            EM: 'Error From Server', //error message
            EC: '-1', // Error code
            DT: '',
        })
    }

}
module.exports = {
    testApi: testApi,
    handleRegister: handleRegister,
}