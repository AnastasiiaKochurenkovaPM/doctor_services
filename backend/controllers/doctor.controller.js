const Doctor = require('../models/doctor.model');
const { sendBusinessMessage } = require('../utils/messageService');


// Отримання інформації про лікаря
const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    // Надсилання повідомлення до RabbitMQ
    await sendBusinessMessage(`Doctor data retrieved: ${doctor.name}`);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();

    await sendBusinessMessage(`All doctors data retrieved. Count: ${doctors.length}`);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getDoctor, getAllDoctors }
