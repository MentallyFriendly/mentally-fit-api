import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect(`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@ds263460.mlab.com:63460/${process.env.MONGO_DB_NAME}`)
    .then(() => {
      console.log('Connected to DB');
    })
    .catch(err => {
      console.log(err.message, 'Unable to connect to DB');
    });
};
