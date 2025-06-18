import jwt from "jsonwebtoken";
require("dotenv").config();//dung vi muon day key vao file moi truong .env

const nonSecure = ['/', '/login', '/register'];//nhung link kh can check quyen

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key);

    } catch (error) {
        console.log(error);
    }
    return token;
}

//giai ma token
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

//nguoi dung da dang nhap chua, kiem tra token trong cookie
const checkUserJWT = (req, res, next) => {
    if(nonSecure.includes(req.path)) return next(); //path nguoi dung gui len co trong nonSecure thi cho di tiep
    //lấy user từ cookie
    let cookies = req.cookies;
    if (cookies && cookies.jwt){
        let token = cookies.jwt;
        //giải mã token, decoded là thông tin người dùng
        let decoded = verifyToken(token);
        //neu co nguoi dung trong token
        if (decoded) {
            req.user = decoded; //gán thông tin người dùng vào req.user
            next(); //tiếp tục xử lý request

        //neu khong co nguoi dung trong token
        } else {
            return res.status(401).json({
                EM: 'Unauthorized',
                EC: 1,
                DT: ''
            });
        } 
    }
    else{
            return res.status(401).json({
                EM: 'Unauthorized',
                EC: 1,
                DT: ''
            });
        }
}

//kiểm tra quyền truy cập của người dùng
const checkUserPermission = (req, res, next) => {
    if(nonSecure.includes(req.path)) return next();
    if(req.user){
        let email = req.user.email;//quuyen email duoi DB so sanh voi token co dung quyen no hay kh
        let roles = req.user.groupWithRoles.roles;
        let currenUrl = req.path;
        if( !roles && roles.length === 0) {
            return res.status(403).json({
                    EM: 'you don\'t have permission to access this resource',
                    EC: 1,
                    DT: ''
                });
            }
            //check xem user co quyen truy cap vao url hien tai hay khong, roles mà nó truy cập có nằm trong quyền của nó kh
            let canAccess = roles.some (item => item.url === currenUrl);
            if (canAccess === true) {
                next(); // nếu có tiếp tục xử lý request
            } else {
                
            }
        }
        else{
            return res.status(403).json({
                    EM: 'you don\'t have permission to access this resource',
                    EC: 1,
                    DT: ''
                });
        }
    }
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}