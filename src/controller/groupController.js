import groupService from '../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroup();
        //phải có return để fe nhận
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'eror from server',//error message
            EC: '-1',//error code
            DT: '',//data
        })
    }
}

module.exports = {
    readFunc
}