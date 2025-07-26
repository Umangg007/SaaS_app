const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date
});

const historySchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idea:     { type: String, required: true },
  tone:     { type: String, required: true },
  result:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const History = mongoose.model('History', historySchema);

module.exports = { User, History }; 