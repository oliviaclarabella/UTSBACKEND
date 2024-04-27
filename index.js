require("dotenv").config();
const express = require("express");
const connectDB = require("./server/config/db");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");
// const path = require('path');

const app = express();
const port = 3001;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//static files
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

//flash messages
app.use(flash());

//use cookie-parser middleware to parse the cookeis
app.use(cookieParser());

//express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 minggu
    },
  })
);

//use toastr
app.use(toastr());

app.use(function (req, res, next) {
  res.locals.toasts = req.toastr.render();
  next();
});

app.set("view engine", "ejs");

//autentikasi dan beranda
app.use("/", require("./server/routes/user"));

//daftar dokter dan jadwal dokter
app.use("/", require("./server/routes/dokter"));

//halaman pengaturan
app.use("/pengaturan", require("./server/routes/pengaturan"));

//create table API
app.use("/create_table", require("./server/routes/create_table"));

app.get("/notfound", (req, res) => {
  res.status(404).render("layouts/notfound.ejs", { title: "Not Found" });
});

//redirect ke halaman /notfound jika halaman tidak ditemukan
// app.get("*", (req, res) => {
//   res.redirect("/notfound")
// });

app.listen(port, () => {
  console.log(`Webserver app listening on port ${port}`);
});
