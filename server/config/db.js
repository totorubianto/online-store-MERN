'strict';
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const dbTest = config.get('mongoURITest');

function connectDB() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      mongoose
        .connect(dbTest, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}
function close() {
  return mongoose.disconnect();
}

module.exports = { connectDB, close };
