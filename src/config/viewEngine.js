import express from "express";

/**
 * 
 */
const configViewEngine = (app) => {
    //Cho phép Express phục vụ các file tĩnh
    app.use(express.static('./src/public'))
    //sử dụng công nghệ gì để viết html đối với nodejs 
    app.set("view engine", "ejs");
    //nơi lưu trữ 
    app.set("views", "./src/views");
}

export default configViewEngine;