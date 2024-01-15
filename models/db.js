const mongoose = require('mongoose');

mongoose
  .connect('mongodb://relieved-crab-snaps.cyclic.app:27017/mobile', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));
