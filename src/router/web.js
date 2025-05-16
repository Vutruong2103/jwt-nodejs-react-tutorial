//những file điều hướng thông thường thì viết ở đây
import express from "express";
import homeController from "../controller/homeController"


const router = express.Router();

//dinh nghia nhung router su dung voi web o trong nay
const initWebRouter = (app) => {
    //express cho sẵn khi sử dụng router thì nó cho sẵn chúng ta 2 biến req và res 
    // truyền vào đầu tiên là (đường link và xử lý ở phía sau)
    router.get("/", homeController.handleHelloWord);
    router.get("/user", homeController.handlUserPage);
    router.post("/users/create-user", homeController.handlCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post("/user/update-user", homeController.handleUpdateUser)
    //file chạy ra đầu tiên
    return app.use("/", router);
    //rest api
    //GET-R, POST-C, PUT-U, DELETE-D
}

export default initWebRouter;

//route => controller handle => render view
//web config server => homecontroller => views