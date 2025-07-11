import jwt from "jsonwebtoken";
require("dotenv").config();//dung vi muon day key vao file moi truong .env


const createJWT = () => {
    let payload = { name: 'vu', address: 'danang' };
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token);

    } catch (error) {
        console.log(error);
    }
    return token;
}

//giai ma token
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    return data;
}

module.exports = {
    createJWT, verifyToken
}