import { where } from 'sequelize/lib/sequelize';
import db from '../models/index';

const getGroupWithRoles = async (user) => {
    console.log("service user: ", user)
    //scope
    // lỗi ở đây  Error: Table 'jwt.group_roles' doesn't exist
    // ko tìm thấy table group_roles => DB đang có table group_role
    // như ở đây user:  User => nó đang lấy user từ table User
    // còn nó báo lỗi  Table 'jwt.group_roles' doesn't exist => là nó đang sai cái table
    // chắc chắn nó sai ngay dòng này => let roles = await db.Group.findOne({
    // hồi nãy user của em chưa có groupId nên nó sẽ ko query ngay cái  where: { id: user.groupId },
    // anh thêm dô groupId = 1, để pass được query nhưng nó vãn sai lúc query ở table group_role nhưng mà ở đây em ko hề có cái db.GroupRole mới ác nè
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],//lấy các cột trong bảng group
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }
    })
    console.log("roles: ", roles)
    return roles ? roles : {};
}

module.exports = {
    getGroupWithRoles
}