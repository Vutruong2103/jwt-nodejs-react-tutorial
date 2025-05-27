import userApiService from '../service/userApiService'


//req: đại diện cho request từ client gửi đến (chứa dữ liệu)
// res: đại diện cho response trả về cho client
const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {//Chúng được truyền từ (FE) thông qua URL query string khi gọi API
            let page = req.query.page;
            let limit = req.query.limit;
            //goi phan trang
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'eror from server',//error message
            EC: '-1',//error code
            DT: '',//data
        })
    }

}

const createFunc = async (req, res) => {
    try {
        //+1 validate cho nay
        let data = await userApiService.createNewUser(req.body);
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

const updateFunc = async (req, res) => {
    try {
        //+1 validate cho nay
        let data = await userApiService.updateUser(req.body);
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


//đầu backend dùng để nhận request xóa người dùng từ frontend
const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);//Lấy giá trị id được frontend gửi vào trong phần data: { id: user.id }
        //phải có return để fe nhận
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

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}