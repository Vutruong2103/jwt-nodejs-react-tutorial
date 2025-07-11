// xu ly data csdl
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';

// create the connection, specify bluebird as Promise


const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassword) => {
    let hasPassword = bcrypt.hashSync(userPassword, salt)
    return hasPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassWord(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log("check err", error);

    }
}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'Select * from users'
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log("check err", error);

    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        //id là cột id, userId là giÁ trị muon xoa truyen vao
        where: { id: userId }
    })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'Delete from users where id=?', [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log("check err", error);

    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    //chuyen sang model obj co nhieu thong tin hon, kh nen chuyen qua obj js vi se thanh bien cua js
    return user.get({ plain: true });//tra ra obj cua js
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'Select * from users where id=?', [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log("check err", error);

    // }
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: {
                id: id,
            },
        },
    );
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         'UPDATE users SET email = ?, username = ? where id = ?', [email, username, id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log("check err", error);

    // }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}