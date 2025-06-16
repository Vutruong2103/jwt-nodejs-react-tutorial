import { literal, where } from 'sequelize/lib/sequelize';
import db from '../models/index';
import Model from 'sequelize/lib/model';
import { checkEmailExist, checkPhoneExist, hashUserPassWord } from './loginRegisterService';


const getAllUser = async () => {
    try {
        //lấy toàn bộ ds người dùng, {} là không có điều kiện lọc, lấy hết
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            // include: {
            //     model: db.Group,
            //     attributes: ["name", "description"]
            // }

        });
        if (users) {
            return {
                EM: "get data success",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "get data success",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);

        return {
            EM: "something wrongs with servies",
            EC: 1,
            DT: []
        }
    }
}
//phan trang
const getUserWithPagination = async (page, limit) => {
    try {
        //gioi han bao nhieu thi bỏ bấy nhiêu phia truoc no
        let offset = (page - 1) * limit;

        //Lấy dữ liệu từ database với Sequelize
        //count: tổng số người dùng trong bảng (không phân trang)
        //rows: danh sách người dùng theo offset và limit (tức là dữ liệu trang hiện tại)
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [['id', 'DESC']]//khi them user moi vao thi dua len đầu

        })
        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);//lam tron
        //Tạo object data để gửi về FE
        let data = {
            totalRow: count,//tổng số dòng (user) trong DB.
            totalPages: totalPages,
            users: rows//danh sách người dùng ở trang hiện tại
        }
        return {
            //neu nhu 0 thi fe se lay data cho nay
            EM: "ok",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        //check email/ phone co ton tai chua, tra ra thong bao
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'the phone is already exist',
                EC: 1,
                DT: 'phone'
            }
        }
        //hash user password
        let hashPass = hashUserPassWord(data.password)
        await db.User.create(data)
        return {
            //neu nhu 0 thi fe se lay data cho nay
            EM: " create ok",
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);

    }
}

const updateUser = async (data) => {//data la nguoi dung nhap vao
    try {
        //kh truyen len groupid thi bao loi
        if (!data.groupId) {
            return {
                EM: "error with empty groupid",
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update 
            await user.update({//nhung data muon update
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: "update user succeeds",
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: "user not found",
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with services",
            EC: 1,
            DT: []
        }
    }

}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();//xóa đối tượng đã tìm được
            return {
                //neu nhu 0 thi fe se lay data cho nay
                EM: "delete succes",
                EC: 0,
                DT: []
            }
        } else {
            return {
                //neu nhu 0 thi fe se lay data cho nay
                EM: "user not exist",
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            //neu nhu 0 thi fe se lay data cho nay
            EM: "error from  service",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}