if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const valRoutes = require("./routes/valRoutes");
const aiRoutes = require("./routes/aiRoutes");
const myProfileRoutes = require("./routes/myProfileRoutes");

console.log(process.env.NODE_ENV || "development");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/userRoutes"));
app.use("/val", valRoutes);
app.use("/ai", aiRoutes);
app.use("/mp", myProfileRoutes);

app.use(require("./middlewares/errorHandler"));

module.exports = app;
