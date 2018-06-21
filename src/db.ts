import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds263460.mlab.com:63460/${process.env.DB_NAME}`);
};
