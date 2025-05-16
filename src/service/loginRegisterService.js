//xử lý chính
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';



const salt = bcrypt.genSaltSync(10);
// băm mật khẩu trước khi lưu vào DB
const hashUserPassWord = (userPassword) => {
    let hasPassword = bcrypt.hashSync(userPassword, salt)
    return hasPassword;
}

//kiem tra ton tai email co trong DB chua, tra ra true, false
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        //phone la cot trong database
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {//rawUserData là một tham số tự đặt và nó là dữ liệu người dùng nhập từ giao diện
    try {
        //check email/ phone co ton tai chua, tra ra thong bao
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'the phone is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPass = hashUserPassWord(rawUserData.password)
        //create new user Dùng Sequelize để tạo user mới trong DB
        await db.User.create({
            //rawUserData.email là giá trị email người dùng đã nhập → gán nó vào cột email của bảng User
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPass,
            phone: rawUserData.phone
        })
        //truong hop kh loi
        return {
            EM: 'a user is create successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrong in service',
            EC: -2
        }
    }
}

//Dùng bcrypt.compareSync để so sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
const checkPassword = (inputPassword, hasPassword) => {
    return bcrypt.compareSync(inputPassword, hasPassword); //true or false
}

//Kiểm tra thông tin đăng nhập người dùng
const handleUserLogin = async (rawData) => {//rawData du lieu ban dau nguoi dung nhap vao
    //tìm user db
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        //Nếu tìm thấy user
        if (user) {
            console.log('found user with e/p')
            //So sánh mật khẩu người dùng nhập vào với mật khẩu đã lưu.
            let isCorrectPassword = checkPassword(rawData.password, user.password);//user.password lay tu db leen
            // Nếu khớp, trả về kết quả thành công
            if (isCorrectPassword === true) {
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: ''
                }
            }
        }
        //Nếu không đúng hoặc không tìm thấy, trả về lỗi
        return {
            EM: 'your email/phone number or password is incorrect',
            EC: 1,
            DT: ''
        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrong in service',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin
}

//khi thao tac voi sequelize thi dung sequelize obj vd: cap nhat, xoa nguoi dung
//khi lam vc voi data thi dung js obj