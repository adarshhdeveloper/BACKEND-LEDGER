const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

//require middlewares
app.use(express.json())
app.use(cookieParser())

/**
 * - Routes
 */
const authRouter = require("./routes/auth.route");
const accountRouter = require("./routes/account.route")

/**
 * -Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);





module.exports = app;