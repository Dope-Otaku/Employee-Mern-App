require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");

//database connetion
connection();

//middleware
app.use(express.json());
app.use(cors());

//routes path
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
