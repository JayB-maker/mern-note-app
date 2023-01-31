const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8086;
const colors = require('colors');
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/note", require("./routes/noteRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started running on port http://localhost:${port}`);
});
