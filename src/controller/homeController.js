// xử lý trên server, hiển thị và xử lý dữ liệu như thế nào, điểu hướng trang
import userService from '../service/userService'

const handleHelloWord = (req, res) => {
    return res.render("home.ejs");
}
const handlUserPage = (req, res) => {
    return res.render("user.ejs")
}
const handlCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //userService.createNewUser(email, password, username)
    userService.getUserList()
    return res.send("handle");
}

//object là 1 class, đối tượng
module.exports = {
    handlUserPage,
    handleHelloWord,
    handlCreateNewUser
}
//view->controller->service xử lý dữ liệu kết nối đến database, lưu dữ liệu vào database
// và trả phản hổi lại cho controller, controller nhận kết quả và trả lại view 

