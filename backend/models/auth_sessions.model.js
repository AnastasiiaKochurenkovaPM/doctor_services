const mongoose = require('mongoose');

const AuthSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Doctor',                         
    required: true
  },
  token: {
    type: String,                           // JWT токен
    required: true
  },
  expiresAt: {
    type: Date,                             // Дата закінчення терміну дії сесії
    required: true
  }
}, { timestamps: true });                 

module.exports = mongoose.model('AuthSession', AuthSessionSchema);
