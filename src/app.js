const express = require("express");
const http = require('http')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const redis = require("redis");
dotenv.config({ path: __dirname + "/config/.env" });


const db = require("./db/db");


//import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});


app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't ${req.method} ${req.originalUrl} on this server`, 404))
})

// app.use(errorHandler)


const port = process.env.PORT || 4000;
// const port = 4000
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});


