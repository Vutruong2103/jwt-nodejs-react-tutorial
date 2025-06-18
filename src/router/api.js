//định nghĩa những api trả về cho react
import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'

const router = express.Router();

//dinh nghia nhung router su dung voi web o trong nay
const initApiRouter = (app) => {

    router.all('*', checkUserJWT, checkUserPermission); //tất cả các request đều phải có token
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    //rest api
    //GET-R, POST-C, PUT-U, DELETE-D
    router.get('/user/read', userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);

    //file chạy ra đầu tiên
    return app.use("/api/v1/", router);

}

export default initApiRouter;

//route => controller handle => render view
//web config server => homecontroller => views