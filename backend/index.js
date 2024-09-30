const cors = require("cors")
const cookieParser = require("cookie-parser")
const doctorRouter = require("./routes/doctor.route.js")
const authRouter = require("./routes/auth.route.js")
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();
listenForBusinessMessages(processMessage);

app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/doctor", doctorRouter)

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
