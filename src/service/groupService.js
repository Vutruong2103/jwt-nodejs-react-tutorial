import db from '../models/index';

const getGroup = async (req, res) =>{
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EM: "get group success",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "error from service",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getGroup
}