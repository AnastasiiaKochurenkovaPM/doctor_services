const cors = require("cors")
const cookieParser = require("cookie-parser")
const doctorRouter = require("./routes/doctor.route.js")
const authDoctorRouter = require("./routes/authDoctor.route.js")
const patientRouter = require("./routes/patient.route.js")
const express = require('express');
const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmqm'); 
const { listenForBusinessMessages } = require('./utils/messageService');
require('dotenv').config();

const app = express();

connectDB();

// connectRabbitMQ().then((channel) => {
//   }).catch(err => {
//     console.error('Failed to connect to RabbitMQ:', err);
//   });

// listenForBusinessMessages()

app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authDoctorRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/patient", patientRouter)

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
