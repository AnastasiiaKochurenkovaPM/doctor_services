const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model')
const mongoose = require('mongoose');
// const { sendBusinessMessage } = require('../utils/messageService');

const createPatient = async (req, res, next) => {
  try {
      const newPatient = new Patient({
          ...req.body,
      });
      
      await newPatient.save();

      //await sendBusinessMessage(JSON.stringify(newPatient));
      res.status(201).send("Patient has been created");
  } catch (error) {
      next(error);
  }
};


const getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    // await sendBusinessMessage(`Patient data retrieved: ${patient.name}`);
    res.status(200).json(patient);

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    // await sendBusinessMessage(`All patients data retrieved. Count: ${patients.length}`);
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const updatePatient = async (req, res, next) => {
  try {
      const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedPatient) {
          return res.status(404).json({ error: 'Patient not found' });
      }
      // await sendBusinessMessage(`Patient data updated: ${updatedPatient.firstName} ${updatedPatient.lastName}`);
      res.status(200).json(updatedPatient);
  } catch (error) {
      if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message });
      }
      next(error);
  }
};


const deletePatient = async (req, res, next) => {
  try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
      }
      
      // await sendBusinessMessage(`Patient permanently deleted: ${patient.firstName} ${patient.lastName}`);
      res.status(200).json({ message: 'Patient has been permanently deleted' });
  } catch (error) {
      next(error);
  }
};


const getPatientsByDoctor = async (req, res, next) => {
  try {
    const doctorId = new mongoose.Types.ObjectId(req.params.doctorId); // Приведення до ObjectId
    
    // Знайти всіх пацієнтів, у яких в medicalHistory є запис з doctorId
    const patients = await Patient.find({
      medicalHistory: {
        $elemMatch: { doctorId: doctorId } // Перевіряємо, чи є doctorId у medicalHistory
      }
    }).populate({
      path: 'medicalHistory.doctorId', // Заповнюємо інформацію про лікаря
      select: 'firstname lastname specialization'
    });

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found for this doctor." });
    }

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};



module.exports = { createPatient, getPatient, getAllPatients, updatePatient, deletePatient, getPatientsByDoctor }
