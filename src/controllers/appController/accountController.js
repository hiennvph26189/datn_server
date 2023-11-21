import accountService from "../../services/appServices/accountServices";


let handleGetMembers = async (req, res) => {
    try {
        let membersList = await accountService.handleGetMembersServices();
        console.log(membersList.errCode)
        return res.status(200).json(membersList)


    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })

    }

};

let handlePostMembers = async (req, res) => {
    try {
        let data = req.body;
        let addMembers = await accountService.handleAddMembersServices(data);
        return res.status(200).json(addMembers)
        // return res.send(ten)


    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })

    }

};
let handlePutMembers = async (req, res) => {
    try {
        let data = req.body;
        let addMembers = await accountService.handlePutMembersServices(data);
        return res.status(200).json(addMembers)
        // return res.send(ten)


    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })

    }

};
module.exports = {
    handleGetMembers:handleGetMembers,
    handlePostMembers:handlePostMembers,
    handlePutMembers:handlePutMembers
}