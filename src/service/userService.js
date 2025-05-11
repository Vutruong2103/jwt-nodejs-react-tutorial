// xu ly data csdl
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise


const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassword) => {
    let hasPassword = bcrypt.hashSync(userPassword, salt)
    return hasPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassWord(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    const [rows, fields] = await connection.execute(
        'INSERT INTO users(email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]
    );
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'Select * from users'
        );
        return rows;
    } catch (error) {
        console.log("check err", error);

    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'Delete from users where id=?', [id]
        );
        return rows;
    } catch (error) {
        console.log("check err", error);

    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'Select * from users where id=?', [id]
        );
        return rows;
    } catch (error) {
        console.log("check err", error);

    }
}

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'UPDATE users SET email = ?, username = ? where id = ?', [email, username, id]
        );
        return rows;
    } catch (error) {
        console.log("check err", error);

    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}