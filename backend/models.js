const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password_hash: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatar: String
  }
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