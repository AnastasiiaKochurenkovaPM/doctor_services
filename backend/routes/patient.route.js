const express = require('express');
const {  createPatient, getPatient, getAllPatients, updatePatient, deletePatient, getPatientsByDoctor } = require('../controllers/patient.controller');
const router = express.Router();

router.post('/create', createPatient)
router.get('/:id', getPatient);
router.get('/', getAllPatients)
router.put('/:id', updatePatient); 
router.delete('/:id', deletePatient);
router.get("/doctor/:doctorId", getPatientsByDoctor);

module.exports = router;