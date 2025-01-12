

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/api/index");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./config/passport");

app.use("/api", indexRouter);

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: "Use api on routes: /api/contacts",
		message: `Use api on routes: 
    /api/users/signup - registration user { email, password},
    /api/users/login - login {email, password},
	/api/users/logout - logout,
	/api/users/current - current user,
	/api/users/ - to change subscription,
    /api/contacts - to get all users or post user,
	/api/contacts/:contactId - to get, delete or update user by ID,
	/api/contacts/:contactId/favorite - to add or remove user from favorites`,
		data: "Not found",
	});
});

app.use((err, req, res, next) => {
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

module.exports = app;