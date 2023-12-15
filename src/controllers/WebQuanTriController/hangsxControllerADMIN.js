import HangsxServieceADMIN from "../../services/webQuanTriService/hangsxServiceADMIN";

let HangsxADMIN = async (req, res) => {
    try {
        let page =  req.query.page;
        let dulieu = await HangsxServieceADMIN.getHangsxWithPagination(page);
        return res.status(200).json(dulieu)
    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}
let handlePostHangsx = async (req, res) => {
    try {
        let data = req.body;
        let addHangsx = await HangsxServieceADMIN.handleAddHangsxServices(data);
        return res.status(200).json(addHangsx);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handlePutHangsx = async (req, res) => {
    try {
        let data = req.body;
        let putHangsx = await HangsxServieceADMIN.handlePutHangsxServices(data);
        return res.status(200).json(putHangsx);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleDeleteHangsx = async (req, res) => {
    try {
        let id = req.body;
        let deleteHangsx = await HangsxServieceADMIN.handleDeleteHangsxServices(id);
        return res.status(200).json(deleteHangsx);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let getHangSx = async (req, res) => {
    try {
       
        let getAllHangSx = await HangsxServieceADMIN.getHangSxServices();
        return res.status(200).json(getAllHangSx);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
module.exports = {
    HangsxADMIN:HangsxADMIN,
    handlePostHangsx:handlePostHangsx,
    handlePutHangsx:handlePutHangsx,
    handleDeleteHangsx:handleDeleteHangsx,
    getHangSx:getHangSx
}