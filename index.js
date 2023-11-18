var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const cookie_parser = require("cookie-parser");
const verifytoken = require("./middleware/verifyToken");
require("dotenv").config();

var app = express();
mongoose.connect(process.env.MongoDB_Url);

app.use(cookie_parser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/login", require("./routes/authRoute"));
app.use("/register", require("./routes/registerRoute"));
app.use("/addPost", require("./routes/postRoute"));
app.use("/socials", require("./routes/socialRoute"));
app.get("/", verifytoken, (req, res) => {
  res.json({ auth: true, name: req.body.user, userId: req.body.userId });
});

app.listen(5000, function () {
  console.log("Web server listening on port 5000");
});
