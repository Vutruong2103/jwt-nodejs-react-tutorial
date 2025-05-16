import loginRegisterService from '../service/loginRegisterService';

//bên này chỉ gọi loginRegisterService xử lý và file này chỉ trả ra kết quả


const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'eror from server',//error message
            EC: '-1',//error code
            DT: '',//data
        })
    }
}

const handleRegister = async (req, res) => {
    //ktra neu nhu co loi thi server chi log loi ra ben nay, react nhan thi nhan thong bao loi
    try {
        //Kiểm tra các trường cần thiết có đầy đủ không
        //req.body: email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required',//error message
                EC: '1',//error code
                DT: '',//data
            })
        }
        //Kiểm tra độ dài mật khẩu
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'your password must have more than 3 letters',//error message
                EC: '1',//error code
                DT: '',//data
            })
        }
        //neu dung het thi vao day
        //service: create user
        //hứng data tu react file register
        let data = await loginRegisterService.registerNewUser(req.body);//registerNewUser(req.body) là một đối số truyền qua tham số raw 
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: '',//data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'eror',//error message
            EC: '-1',//error code
            DT: '',//data
        })
    }
}

module.exports = {
    handleRegister, handleLogin
}