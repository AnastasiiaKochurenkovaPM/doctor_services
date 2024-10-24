const express = require('express');
const {  getDoctor, getAllDoctors, updateDoctor, softDeleteDoctor, deleteDoctor } = require('../controllers/doctor.controller');
const router = express.Router();

router.get('/:id', getDoctor);
router.get('/', getAllDoctors)
router.put('/:id', updateDoctor); 
router.delete('/:id/soft', softDeleteDoctor); 
router.delete('/:id', deleteDoctor);

module.exports = router;