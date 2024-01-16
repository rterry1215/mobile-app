const express = require("express");
require("dotenv").config();
require("./config/db");
const userRouter = require("./routes/user");
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(userRouter);
// testing
// app.get('/', (req, res) => {
//   res.json({ success: true, message: 'Welcome to backend zone!' });
// });
const PORT = 8000;
app.listen(PORT, () => {
  console.log(PORT + "port is listening");
});
