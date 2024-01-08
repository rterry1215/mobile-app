const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/mobile', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));
