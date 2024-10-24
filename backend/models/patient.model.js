const mongoose = require("mongoose")
const { Schema } = mongoose

const PatientSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  adress: {
    type: String,
    required: false,
  },
  medicalHistory: [
    {
      condition: {
        type: String,       // Діагноз або стан
        required: true
      },
      date: {
        type: Date,         // Дата діагностики
        required: true
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,  // Лікар, який проводив діагностику
        ref: 'Doctor',        // Посилання на модель лікаря
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
      }
    }
  ]
},{
  timestamps:true
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;