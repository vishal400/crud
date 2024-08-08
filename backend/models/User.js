const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user: { type: String, required: true },
  interest: { type: [String], required: true },
  age: { type: Number, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ }
});

module.exports = mongoose.model('User', UserSchema);
