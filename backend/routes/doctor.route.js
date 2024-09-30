const express = require('express');
const {  getDoctor, getAllDoctors } = require('../controllers/doctor.controller');
const router = express.Router();

router.get('/:id', getDoctor);
router.get('/', getAllDoctors)

module.exports = router;