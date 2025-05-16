//định nghĩa những api trả về cho react
import express from "express";
import apiController from '../controller/apiController';

const router = express.Router();

//dinh nghia nhung router su dung voi web o trong nay
const initApiRouter = (app) => {
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    //file chạy ra đầu tiên
    return app.use("/api/v1/", router);
    //rest api
    //GET-R, POST-C, PUT-U, DELETE-D
}

export default initApiRouter;

//route => controller handle => render view
//web config server => homecontroller => views