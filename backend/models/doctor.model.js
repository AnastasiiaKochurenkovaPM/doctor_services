const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
},{
  timestamps:true
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;