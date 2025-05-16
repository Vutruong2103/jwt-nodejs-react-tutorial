import express from "express";
import initWebRoutes from "./router/web";
import initApiRouter from "./router/api";
import confiViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import configCors from "./config/cors";
// import connnection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

confiViewEngine(app);

//config body parser chuyen data thanh dang json obj; lay query, params, body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connnection();
initWebRoutes(app);
initApiRouter(app);

app.listen(PORT, () => {
    console.log("jwt backend is running on the port =" + PORT);
})