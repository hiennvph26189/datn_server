import db from '../models/index';


import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


const checkEmailExit = async(userEmail) => {
    let user = await db.User.findOne({
        where : { email: userEmail}
    })
    if(user){
        return true;
    }
    return false;
}

const checkPhoneExit = async(userPhone) => {
    let user = await db.User.findOne({
        
        where : { phoneNumber: userPhone}
    })
    if(user){
        return true;
    }

    return false;
}

const registerNewUser =async(rawUserData) => {

        try {
    let isEmailExit = await checkEmailExit(rawUserData.email);
    if(isEmailExit ==true ){
        return {
            EM:'The Email is  aleary exits',
            EC: 1
        }
    }
    let isPhoneExit = await checkPhoneExit(rawUserData.phone);
    if(isPhoneExit ==true ){
        return {
            EM:'The Phone is  aleary exits',
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
        EM:'A user create successfuly',
        EC: 0
    }  

    } catch (error) {
        console.log(error)
        return {
            EM:'Something wrongs in service',
            EC: -2
        }    
    }


}
module.exports = {
    registerNewUser:registerNewUser,

}