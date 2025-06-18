import express from "express";
import initWebRoutes from "./router/web";
import initApiRouter from "./router/api";
import confiViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import configCors from "./config/cors";
import cookieParser from 'cookie-parser'
// import connnection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

confiViewEngine(app);

//config body parser chuyen data thanh dang json obj; lay query, params, body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parser, cài đặt để có thể lấy cookies từ người dùng gửi lên
app.use(cookieParser());

// connnection();
initWebRoutes(app);
initApiRouter(app);

//req => middleware => res
app.use((req, res) =>{
    return res.send('404 Not Found');
})

app.listen(PORT, () => {
    console.log("jwt backend is running on the port =" + PORT);
})