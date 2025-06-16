import express from "express";
import initWebRoutes from "./router/web";
import initApiRouter from "./router/api";
import confiViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import configCors from "./config/cors";
// import connnection from "./config/connectDB";
import { createJWT, verifyToken } from './middleware/JWTAction'

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

confiViewEngine(app);

//config body parser chuyen data thanh dang json obj; lay query, params, body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test jwt 
createJWT();
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidnUiLCJhZGRyZXNzIjoiZGFuYW5nIiwiaWF0IjoxNzQ5OTc3MjgzfQ.R52zoKi9PG8Qiayi9H5R8NDBskeLMSXEfWmbdbpiVHI');
console.log(decodedData);


// connnection();
initWebRoutes(app);
initApiRouter(app);

app.listen(PORT, () => {
    console.log("jwt backend is running on the port =" + PORT);
})