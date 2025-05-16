// xử lý trên server, hiển thị và xử lý dữ liệu như thế nào, điểu hướng trang
import userService from '../service/userService'

const handleHelloWord = (req, res) => {
    return res.render("home.ejs");
}
const handlUserPage = async (req, res) => {
    let userList = await userService.getUserList()
    //truyen qua views la truyen obj{}
    return res.render("user.ejs", { userList })
}
const handlCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username)
    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) => {
    //lấy đc id bên userService rồi thì hứng nó 
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
}

const getUpdateUserPage = async (req, res) => {
    //lấy đc id bên userService rồi thì hứng nó 
    let id = req.params.id;
    let user = await userService.getUserById(id);
    //Tạo một biến userData rỗng để chứa dữ liệu người dùng sau khi kiểm tra.
    let userData = {};
    userData = user;
    // if (user && user.length > 0) {
    //     //gán userData = user[0], tức là lấy người dùng đầu tiên trong danh sách (vì có thể kết quả là một mảng) 
    //     userData = user[0];
    // }
    //Dùng res.render(...) để render file user-update.ejs và truyền đối tượng userData vào EJS
    return res.render('user-update.ejs', { userData })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfo(email, username, id)
    return res.redirect('/user');
}

//object là 1 class, đối tượng
module.exports = {
    handlUserPage,
    handleHelloWord,
    handlCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}
//view->controller->service xử lý dữ liệu kết nối đến database, lưu dữ liệu vào database
// và trả phản hổi lại cho controller, controller nhận kết quả và trả lại view 

