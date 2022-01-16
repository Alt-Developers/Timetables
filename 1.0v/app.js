const express = require("express");

const app = express();
const homeRoute = require("./routes/home");
const classesRoute = require("./routes/classes");

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(homeRoute);
app.use(classesRoute);

app.use("/", (req, res, next) => {
  res.render("errors/pagenotfound");
});

app.listen(8000);
// app.listen(process.env.PORT || port);
