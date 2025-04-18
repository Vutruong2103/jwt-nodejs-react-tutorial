//những file điều hướng thông thường thì viết ở đây
import express from "express";

const router = express.Router();

//dinh nghia nhung router su dung voi web o trong nay
const initWebRouter = (app) =>{
    router.get("/", (req, res) =>{
        return res.send("hello");
    })
    return app.use("/", router);
}

export default initWebRouter;