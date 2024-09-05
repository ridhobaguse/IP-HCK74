if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const valRoutes = require("./routes/valRoutes");
const aiRoutes = require("./routes/aiRoutes");

console.log(process.env.NODE_ENV || "development");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/userRoutes"));
app.use("/val", valRoutes);
app.use("/ai", aiRoutes);

app.use(require("./middlewares/errorHandler"));

module.exports = app;
