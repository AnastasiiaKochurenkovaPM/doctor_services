const Doctor = require('../models/doctor.model');
// const { sendBusinessMessage } = require('../utils/messageService');


// Отримання інформації про лікаря
const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    // Надсилання повідомлення до RabbitMQ
    // await sendBusinessMessage(`Doctor data retrieved: ${doctor.name}`);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();

    // await sendBusinessMessage(`All doctors data retrieved. Count: ${doctors.length}`);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Оновлення особистих даних лікаря
const updateDoctor = async (req, res, next) => {
  try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedDoctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }
      // await sendBusinessMessage(`Doctor data updated: ${updatedDoctor.firstName} ${updatedDoctor.lastName}`);
      res.status(200).json(updatedDoctor);
  } catch (error) {
      if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message });
      }
      next(error);
  }
};

// Soft delete лікаря
const softDeleteDoctor = async (req, res, next) => {
  try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }
      
      doctor.isDeleted = true; // Встановлюємо поле isDeleted
      await doctor.save();

      // await sendBusinessMessage(`Doctor marked as deleted: ${doctor.firstName} ${doctor.lastName}`);
      res.status(200).json({ message: 'Doctor has been marked as deleted' });
  } catch (error) {
      next(error);
  }
};

// Видалення лікаря
const deleteDoctor = async (req, res, next) => {
  try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }
      
      // await sendBusinessMessage(`Doctor permanently deleted: ${doctor.firstName} ${doctor.lastName}`);
      res.status(200).json({ message: 'Doctor has been permanently deleted' });
  } catch (error) {
      next(error);
  }
};


module.exports = { getDoctor, getAllDoctors, updateDoctor, softDeleteDoctor, deleteDoctor }
