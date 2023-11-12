
import db from "../models/index";

const getAllUser = async () => {
    try {
        let users = await db.User.findAll(
        //     {
        //     attributes: ["id", "usersname", "email", "phone", "sex"],
        //     include: {model: db.Group, attributes: ["name", "description"],},
        // }
        );
        if (users) {
          
            return {
                EM: 'get data success', //error message
                EC: '0', // Error code
                DT: users,
            }

        } else {
            return {
                EM: 'get data success', //error message
                EC: '0', // Error code
                DT: [],
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'somthing wrong with serviece', //error message
            EC: '1', // Error code
            DT: [],
        }
    }

}

const createNewUser = async(data) => {
    try {
       await db.User.create({

       })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async(data) => {
    try {
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if(user){
            // update
            user.save({
    
            })
        }else{
            // not found
        }
        
    } catch (error) {
        console.log(error)
    }
  
}

const deleteUser = async(id) => {
    try {
        await db.User.delete({
            where: {id:id}
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}