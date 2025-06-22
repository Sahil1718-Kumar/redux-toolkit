require("dotenv").config();
require("./models").dbConnection();
const express = require("express");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const adminRouter = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;
