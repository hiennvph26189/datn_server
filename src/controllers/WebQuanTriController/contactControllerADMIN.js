import contactServieceADMIN from "../../services/webQuanTriService/contactServieceADMIN";
const nodemailer = require('nodemailer');

let contactADMIN = async (req, res) => {
    try {
        let page =  req.query.page;
        let dulieu = await contactServieceADMIN.getUserWithPagination(page);
        return res.status(200).json(dulieu)
    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}
let putPhanHoiContactADMIN = async (req, res) => {
    try {
        let data = req.body;
        let email = data.email;
        let tieude = data.tieude;
        let phanhoi = data.phanhoi;
        console.log(data);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'quanv6112@gmail.com',
                pass: 'xuku nndh usio okbv',
            },
        });

        const mailOptions = {
            from: 'quanv6112@gmail.com',
            to: email,
            subject: tieude,
            text: phanhoi,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error.toString());
            } else {
                let dulieu = await  contactServieceADMIN.handlePutPhanHoiContactSeviceADMIN(data);
                console.log(dulieu)
                res.status(200).json(dulieu);
            }

        });



    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}



module.exports = {
    contactADMIN: contactADMIN,
    putPhanHoiContactADMIN: putPhanHoiContactADMIN,

}