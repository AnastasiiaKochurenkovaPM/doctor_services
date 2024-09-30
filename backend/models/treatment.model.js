const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,   // Посилання на пацієнта
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,   // Посилання на лікаря
    ref: 'Doctor',
    required: true
  },
  diagnosis: {
    type: String,                           
    required: true
  },
  treatmentPlan: {
    type: String,                           
    required: true
  },
  medications: [                           
    {
      name: {
        type: String,                       
        required: true
      },
      dosage: {
        type: String,                       
        required: true
      },
      duration: {
        type: String,                      
        required: true
      }
    }
  ],
  treatmentDate: {
    type: Date,                             
    required: true
  },
  followUpDate: {
    type: Date                              
  },
  isDeleted: {
    type: Boolean,                          
    default: false
  }
}, { timestamps: true });               


module.exports = mongoose.model('Treatment', TreatmentSchema);