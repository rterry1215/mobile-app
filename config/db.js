const mongoose = require("mongoose");

mongoose
  .connect(
    // "mongodb+srv://montgasam:sammontgamery@cluster0.857f46h.mongodb.net/mobile",
    // "mongodb://127.0.0.1:27017/mobile",
    "mongodb+srv://chaolongpiao:chaolong1995@cluster0.inglvcw.mongodb.net/mobile",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("our db is connected");
  })
  .catch((err) => console.log(err.message));
