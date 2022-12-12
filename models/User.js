const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
});

module.exports = model('User', userSchema);