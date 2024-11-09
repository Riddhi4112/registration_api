require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5002
const dbconnection = require("./dbconnection/dbconnection")
const allRouteRouter = require("./routes/allRoutes")


const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    cors({
        origin: "*",
        Credentials: true,
    })
);

app.use(express.json());

dbconnection();

allRouteRouter.routes(app)

app.listen(PORT, function (err) {
    if(err) throw err;
    console.log(`...Server listening on port ${PORT}...`);
})