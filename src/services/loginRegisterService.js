import db from '../models/index';
import { Op } from 'sequelize';

import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const checkEmailExit = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExit = async (userPhone) => {
    let user = await db.User.findOne({

        where: { phoneNumber: userPhone }
    })
    if (user) {
        return true;
    }
    console.log("hehehehehe")

    return false;
}

const registerNewUser = async (rawUserData) => {

    try {
        let isEmailExit = await checkEmailExit(rawUserData.email);
        if (isEmailExit == true) {
            return {
                EM: 'The Email is  aleary exits',
                EC: 1
            }
        }
        let isPhoneExit = await checkPhoneExit(rawUserData.phone);
        if (isPhoneExit == true) {
            return {
                EM: 'The Phone is  aleary exits',
                EC: 1
            }
        }

        // haspassword
        let hashPassword = hashUserPassword(rawUserData.password);
        //create user

        await db.User.create({
            firstName: rawUserData.firtsname,
            lastName: rawUserData.lastname,
            email: rawUserData.email,
            password: hashPassword,
            phoneNumber: rawUserData.phone,
            address: rawUserData.address,
        })
        return {
            EM: 'A user create successfuly',
            EC: 0
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service',
            EC: -2
        }
    }


}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false

}

const handlUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.ValueLogin },
                    { phoneNumber: rawData.ValueLogin }
                ]
            }
        })
        if (user) {
            console.log("tim thay user roi anh em")
            let isConnectPassword = checkPassword(rawData.password, user.password);
            if (isConnectPassword == true) {
                return {
                    EM: 'OKOK',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log(">>>>>>>>>>Input user with email", rawData.ValueLogin,"password: ", rawData.password);
        return {
            EM: 'Tai Khoan Mat Khau Khong Chinh Xac',
            EC: 1,
            DT: ''
        }


        // if (isPhoneExit == false) {
        //  
        // }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser: registerNewUser,
    handlUserLogin: handlUserLogin,

}