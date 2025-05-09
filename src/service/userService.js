// xu ly data csdl
import bcrypt from 'bcryptjs';
import mysql from 'mysql2';


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});
const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassword) => {
    let hasPassword = bcrypt.hashSync(userPassword, salt)
    return hasPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassWord(password);
    connection.query(
        'INSERT INTO users(email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }  
        }
    );
}

const getUserList = () =>{
    let users = [];
    connection.query(
        'Select * from users', 
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }  
            console.log("chekc",results);
            
        }
    );
}

module.exports = {
    createNewUser, getUserList
}